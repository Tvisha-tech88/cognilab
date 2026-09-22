from agents.research_agent.agent import run_research_agent
from agents.hypothesis_agent.agent import generate_experiment


def run_cognilab_pipeline(
    research_question: str
) -> dict:

    # --------------------------------------------------
    # STEP 1: Research Agent
    # --------------------------------------------------

    research_result = run_research_agent(
        research_question
    )

    research_evidence = research_result[
        "research_evidence"
    ]

    # --------------------------------------------------
    # STEP 2: Hypothesis + Experiment Agent
    # --------------------------------------------------

    experiment_result = generate_experiment(
        research_question=research_question,
        research_evidence=[
            research_evidence
        ]
    )

    # --------------------------------------------------
    # Combined pipeline result
    # --------------------------------------------------

    return {
        "research": research_result,
        "experiment": experiment_result
    }