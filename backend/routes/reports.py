import base64
import uuid
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from database import get_supabase
from services.analyzer import analyze_report_image

router = APIRouter()

BUCKET_NAME = "reports"


@router.post("/upload")
async def upload_report(
    file: UploadFile = File(...),
    user_id: str = Form(default="default"),
):
    """Upload a medical report image → store in Supabase Storage → save metadata to DB."""
    sb = get_supabase()

    # Read file
    contents = await file.read()
    file_ext = file.filename.split(".")[-1] if file.filename else "jpg"
    storage_path = f"{user_id}/{uuid.uuid4().hex}.{file_ext}"

    # Upload to Supabase Storage
    try:
        sb.storage.from_(BUCKET_NAME).upload(
            storage_path,
            contents,
            file_options={"content-type": file.content_type or "image/jpeg"},
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Storage upload failed: {str(e)}")

    # Get public URL
    image_url = sb.storage.from_(BUCKET_NAME).get_public_url(storage_path)

    # Save to DB
    record = {
        "user_id": user_id,
        "image_url": image_url,
        "file_name": file.filename,
    }
    result = sb.table("reports").insert(record).execute()

    return {"success": True, "report": result.data[0] if result.data else record}


@router.post("/{report_id}/analyze")
async def analyze_report(report_id: str, user_id: str = "default"):
    """Analyze a stored report using Gemini Vision and save results to DB."""
    sb = get_supabase()

    # Fetch report from DB
    result = sb.table("reports").select("*").eq("id", report_id).eq("user_id", user_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Report not found")

    report = result.data[0]
    image_url = report["image_url"]

    # Download image from storage
    import httpx

    async with httpx.AsyncClient() as client:
        img_response = await client.get(image_url)
        if img_response.status_code != 200:
            raise HTTPException(status_code=500, detail="Failed to download report image")
        image_base64 = base64.b64encode(img_response.content).decode("utf-8")

    # Analyze with Gemini
    try:
        analysis = await analyze_report_image(image_base64)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

    # Update DB with analysis
    health_flags = analysis.get("healthFlags", [])
    urgency = analysis.get("urgency", "normal")

    sb.table("reports").update({
        "analysis": analysis,
        "health_flags": health_flags,
        "urgency": urgency,
    }).eq("id", report_id).execute()

    return {"success": True, "analysis": analysis, "health_flags": health_flags, "urgency": urgency}


@router.post("/upload-and-analyze")
async def upload_and_analyze(
    file: UploadFile = File(...),
    user_id: str = Form(default="default"),
):
    """Upload a report image AND immediately analyze it — single endpoint for frontend convenience."""
    sb = get_supabase()

    # Read file contents
    contents = await file.read()
    file_ext = file.filename.split(".")[-1] if file.filename else "jpg"
    storage_path = f"{user_id}/{uuid.uuid4().hex}.{file_ext}"

    # Upload to Supabase Storage
    try:
        sb.storage.from_(BUCKET_NAME).upload(
            storage_path,
            contents,
            file_options={"content-type": file.content_type or "image/jpeg"},
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Storage upload failed: {str(e)}")

    # Get public URL
    image_url = sb.storage.from_(BUCKET_NAME).get_public_url(storage_path)

    # Analyze with Gemini
    image_base64 = base64.b64encode(contents).decode("utf-8")
    try:
        analysis = await analyze_report_image(image_base64, file.content_type or "image/jpeg")
    except Exception as e:
        # Still save the report even if analysis fails
        record = {"user_id": user_id, "image_url": image_url, "file_name": file.filename}
        sb.table("reports").insert(record).execute()
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

    health_flags = analysis.get("healthFlags", [])
    urgency = analysis.get("urgency", "normal")

    # Save to DB with analysis
    record = {
        "user_id": user_id,
        "image_url": image_url,
        "file_name": file.filename,
        "analysis": analysis,
        "health_flags": health_flags,
        "urgency": urgency,
    }
    result = sb.table("reports").insert(record).execute()

    return {
        "success": True,
        "report": result.data[0] if result.data else record,
        "analysis": analysis,
    }


@router.get("/")
async def list_reports(user_id: str = "default"):
    """List all reports for a user, newest first."""
    sb = get_supabase()
    result = sb.table("reports").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    return {"reports": result.data}


@router.get("/{report_id}")
async def get_report(report_id: str, user_id: str = "default"):
    """Get a single report with full analysis."""
    sb = get_supabase()
    result = sb.table("reports").select("*").eq("id", report_id).eq("user_id", user_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Report not found")
    return {"report": result.data[0]}
