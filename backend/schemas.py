from typing import Any, Dict, Optional

from pydantic import BaseModel, Field


class ResearchRequest(BaseModel):
    research_question: str = Field(
        ...,
        min_length=5,
        description="Research question to investigate"
    )


class ResearchRunResponse(BaseModel):
    run_id: str
    status: str
    research_question: str
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None