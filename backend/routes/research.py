import uuid

from fastapi import APIRouter, HTTPException

from backend.schemas import (
    ResearchRequest,
    ResearchRunResponse
)

from backend.store import (
    create_run,
    update_run,
    get_run
)

from backend.orchestrator import (
    run_research_workflow
)


router = APIRouter(
    prefix="/api/research",
    tags=["Research"]
)


@router.post(
    "",
    response_model=ResearchRunResponse
)
def start_research(
    request: ResearchRequest
):

    run_id = str(uuid.uuid4())

    create_run(
        run_id=run_id,
        research_question=request.research_question
    )

    try:

        update_run(
            run_id,
            status="running"
        )

        result = run_research_workflow(
            request.research_question
        )

        update_run(
            run_id,
            status="completed",
            result=result
        )

        return {
            "run_id": run_id,
            "status": "completed",
            "research_question": request.research_question,
            "result": result,
            "error": None
        }

    except Exception as e:

        update_run(
            run_id,
            status="failed",
            error=str(e)
        )

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get(
    "/{run_id}",
    response_model=ResearchRunResponse
)
def get_research_run(
    run_id: str
):

    run = get_run(run_id)

    if run is None:
        raise HTTPException(
            status_code=404,
            detail="Research run not found."
        )

    return run