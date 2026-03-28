from fastapi import APIRouter
from pydantic import BaseModel
from services.scheme_matcher import match_schemes, format_schemes_for_agent

router = APIRouter()


class SchemeMatchRequest(BaseModel):
    health_flags: list[str] | None = None
    income: int | None = None
    state: str | None = None
    gender: str | None = None
    occupation: str | None = None
    category: str | None = None
    lang: str = "en"


@router.post("/match")
async def match_user_schemes(req: SchemeMatchRequest):
    """Match schemes based on user profile and health flags."""
    matched = match_schemes(
        health_flags=req.health_flags,
        income=req.income,
        state=req.state,
        gender=req.gender,
        occupation=req.occupation,
        category=req.category,
    )
    return {
        "count": len(matched),
        "schemes": matched,
        "summary": format_schemes_for_agent(matched, req.lang),
    }


@router.get("/")
async def list_all_schemes():
    """Return the full schemes database."""
    from services.scheme_matcher import SCHEMES
    return {"schemes": SCHEMES, "count": len(SCHEMES)}
