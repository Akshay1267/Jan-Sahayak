from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import get_supabase
from services.analyzer import get_report_summary_for_agent
from services.scheme_matcher import match_schemes, format_schemes_for_agent

router = APIRouter()


class ToolRequest(BaseModel):
    """ElevenLabs Conversational AI custom tool webhook payload."""
    tool_name: str
    parameters: dict = {}


@router.post("/tool")
async def agent_tool_webhook(req: ToolRequest):
    """
    Webhook endpoint for ElevenLabs Conversational AI custom tools.
    The agent calls this with a tool_name and parameters, and we return the result.
    """
    if req.tool_name == "get_user_reports":
        return await _get_user_reports(req.parameters)
    elif req.tool_name == "match_schemes":
        return await _match_schemes(req.parameters)
    elif req.tool_name == "get_report_details":
        return await _get_report_details(req.parameters)
    else:
        raise HTTPException(status_code=400, detail=f"Unknown tool: {req.tool_name}")


async def _get_user_reports(params: dict) -> dict:
    """Fetch the user's recent reports and return summaries for the agent."""
    user_id = params.get("user_id", "default")
    sb = get_supabase()

    result = (
        sb.table("reports")
        .select("id, file_name, health_flags, urgency, analysis, created_at")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .limit(5)
        .execute()
    )

    reports = result.data or []
    if not reports:
        return {"result": "The user has no medical reports uploaded yet."}

    summaries = []
    for r in reports:
        analysis = r.get("analysis")
        summary = analysis.get("summary", "Unknown report") if analysis else "Not analyzed yet"
        flags = r.get("health_flags") or []
        urgency = r.get("urgency", "normal")
        date = r.get("created_at", "")[:10]
        summaries.append(f"- {date}: {summary} | Flags: {', '.join(flags) or 'None'} | Urgency: {urgency}")

    return {
        "result": f"User has {len(reports)} recent reports:\n" + "\n".join(summaries),
        "report_count": len(reports),
    }


async def _match_schemes(params: dict) -> dict:
    """Match government schemes based on agent-provided parameters."""
    health_flags = params.get("health_flags", [])
    income = params.get("income")
    state = params.get("state")
    gender = params.get("gender")
    occupation = params.get("occupation")
    lang = params.get("lang", "en")

    matched = match_schemes(
        health_flags=health_flags,
        income=income,
        state=state,
        gender=gender,
        occupation=occupation,
    )

    return {
        "result": format_schemes_for_agent(matched, lang),
        "count": len(matched),
    }


async def _get_report_details(params: dict) -> dict:
    """Get detailed analysis of a specific report for the agent to discuss."""
    user_id = params.get("user_id", "default")
    report_id = params.get("report_id")
    sb = get_supabase()

    if report_id:
        result = sb.table("reports").select("*").eq("id", report_id).eq("user_id", user_id).execute()
    else:
        # Get the most recent report
        result = (
            sb.table("reports")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .limit(1)
            .execute()
        )

    if not result.data:
        return {"result": "No report found."}

    report = result.data[0]
    analysis = report.get("analysis")

    if not analysis:
        return {"result": f"Report '{report.get('file_name', 'unknown')}' has not been analyzed yet."}

    summary = await get_report_summary_for_agent(analysis)
    return {"result": summary}
