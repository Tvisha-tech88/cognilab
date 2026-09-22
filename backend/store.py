from typing import Any, Dict


_runs: Dict[str, Dict[str, Any]] = {}


def create_run(
    run_id: str,
    research_question: str
):
    _runs[run_id] = {
        "run_id": run_id,
        "research_question": research_question,
        "status": "queued",
        "result": None,
        "error": None
    }


def update_run(
    run_id: str,
    **updates
):
    if run_id not in _runs:
        raise KeyError(f"Run {run_id} not found.")

    _runs[run_id].update(updates)


def get_run(run_id: str):
    return _runs.get(run_id)