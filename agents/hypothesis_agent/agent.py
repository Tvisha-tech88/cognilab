import json
import re

from auth import credential
from azure.ai.projects import AIProjectClient

from .validator import validate_experiment


# ============================================================
# AZURE AI FOUNDRY CONFIGURATION
# ============================================================

ENDPOINT = (
    "FOUNDRY_ENDPOINT"
    "API"
)

TENANT_ID = "TENANT_ID"

AGENT_NAME = "AGENT_NAME"
AGENT_VERSION = "AGENT_VERSION"



# ============================================================
# FOUNDRY CLIENT
# ============================================================

project_client = AIProjectClient(
    endpoint=ENDPOINT,
    credential=credential
)

openai_client = project_client.get_openai_client()


# ============================================================
# JSON EXTRACTION
# ============================================================

def extract_json(text: str) -> dict:
    """
    Extract the machine-readable JSON object returned by
    the Cognilab Hypothesis Agent.
    """

    if not text:
        raise ValueError(
            "The Hypothesis Agent returned an empty response."
        )

    match = re.search(
        r"```json\s*(.*?)\s*```",
        text,
        re.DOTALL | re.IGNORECASE
    )

    if not match:
        raise ValueError(
            "The Hypothesis Agent did not return a JSON block."
        )

    json_text = match.group(1).strip()

    try:
        return json.loads(json_text)

    except json.JSONDecodeError as e:
        raise ValueError(
            f"The Hypothesis Agent returned invalid JSON: {e}"
        ) from e


# ============================================================
# HYPOTHESIS + EXPERIMENT DESIGN
# ============================================================

def generate_experiment(
    research_question: str,
    research_evidence: list
) -> dict:
    """
    Generate a testable hypothesis and structured experiment
    specification from a research question and research evidence.

    The agent runs in the shared Cognilab Foundry project.

    Parameters
    ----------
    research_question : str
        The research question received from the Research Agent
        or Cognilab application.

    research_evidence : list
        Evidence gathered by the Research Agent.

    Returns
    -------
    dict
        {
            "response_text": "...",
            "experiment_plan": {
                ...
            }
        }

    The generated experiment is independently validated by
    the deterministic Python validator before being returned.
    """

    if not isinstance(research_question, str):
        raise TypeError(
            "research_question must be a string."
        )

    if not research_question.strip():
        raise ValueError(
            "research_question cannot be empty."
        )

    if not isinstance(research_evidence, list):
        raise TypeError(
            "research_evidence must be a list."
        )

    user_input = {
        "research_question": research_question,
        "research_evidence": research_evidence
    }

    user_input_json = json.dumps(
        user_input,
        indent=2,
        ensure_ascii=False
    )

    response = openai_client.responses.create(
        input=[
            {
                "role": "user",
                "content": user_input_json
            }
        ],
        extra_body={
            "agent_reference": {
                "name": AGENT_NAME,
                "version": AGENT_VERSION,
                "type": "agent_reference"
            }
        },
    )

    response_text = response.output_text

    if not response_text:
        raise ValueError(
            "The Hypothesis Agent returned no response text."
        )

    plan = extract_json(response_text)

    # Python validator is authoritative.
    validation = validate_experiment(plan)
    plan["validation"] = validation

    return {
        "response_text": response_text,
        "experiment_plan": plan
    }


# ============================================================
# STRUCTURED INPUT WRAPPER
# ============================================================

def generate_experiment_from_input(
    user_input: dict
) -> dict:
    """
    Generate an experiment from the standard Cognilab input.

    Expected input:

    {
        "research_question": "...",
        "research_evidence": [...]
    }
    """

    if not isinstance(user_input, dict):
        raise TypeError(
            "user_input must be a dictionary."
        )

    research_question = user_input.get(
        "research_question"
    )

    research_evidence = user_input.get(
        "research_evidence",
        []
    )

    return generate_experiment(
        research_question=research_question,
        research_evidence=research_evidence
    )
