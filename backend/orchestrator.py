from typing import Any, Dict

from agents.research_agent.agent import (
    run_research_agent
)

from agents.hypothesis_agent.agent import (
    generate_experiment
)


def run_research_workflow(
    research_question: str
) -> Dict[str, Any]:

    # ==================================================
    # AGENT 1 — RESEARCH
    # ==================================================

    research_result = run_research_agent(
        research_question
    )

    research_evidence = research_result[
        "research_evidence"
    ]

    # ==================================================
    # AGENT 2 — HYPOTHESIS + EXPERIMENT DESIGN
    # ==================================================

    experiment_result = generate_experiment(
        research_question=research_question,
        research_evidence=[
            research_evidence
        ]
    )

    # ==================================================
    # FUTURE AGENTS
    # ==================================================

    # Resource Discovery Agent
    #
    # resources = discover_resources(
    #     experiment_result["experiment_plan"]
    # )

    # Experiment Agent
    #
    # experiment_results = run_experiment(
    #     resources
    # )

    # Analysis Agent
    #
    # analysis = analyze_results(
    #     experiment_results
    # )

    # Report Agent
    #
    # report = generate_report(
    #     research_result,
    #     experiment_result,
    #     experiment_results,
    #     analysis
    # )

    # ==================================================
    # CURRENT RESULT
    # ==================================================

    return {
        "research": research_result,
        "experiment": experiment_result
    }