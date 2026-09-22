import json
import re

from auth import credential
from azure.ai.projects import AIProjectClient


# ============================================================
# AZURE FOUNDRY CONFIGURATION
# ============================================================

ENDPOINT = (
    "https://cognilab-ai-korea.services.ai.azure.com"
    "/api/projects/cognilab"
)

TENANT_ID = "c3e02fe4-fe78-4dc4-aee7-e3951ae8862f"

AGENT_NAME = "cognilab-research-agent"
AGENT_VERSION = "4"


# ============================================================
# AZURE AUTHENTICATION
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
    Extract the machine-readable JSON object produced by
    the Research Agent.

    Handles:
    - ```json ... ```
    - ``` ... ```
    - raw JSON objects
    """

    if not text:
        raise ValueError(
            "The Research Agent returned an empty response."
        )

    text = text.strip()

    # --------------------------------------------------------
    # 1. Try ```json ... ``` block
    # --------------------------------------------------------

    match = re.search(
        r"```json\s*(.*?)\s*```",
        text,
        re.DOTALL | re.IGNORECASE
    )

    if match:
        json_text = match.group(1).strip()

        try:
            return json.loads(json_text)

        except json.JSONDecodeError:
            pass

    # --------------------------------------------------------
    # 2. Try generic fenced code block
    # --------------------------------------------------------

    match = re.search(
        r"```\s*(.*?)\s*```",
        text,
        re.DOTALL
    )

    if match:
        json_text = match.group(1).strip()

        try:
            return json.loads(json_text)

        except json.JSONDecodeError:
            pass

    # --------------------------------------------------------
    # 3. Try extracting raw JSON object
    # --------------------------------------------------------

    start = text.find("{")

    if start != -1:

        decoder = json.JSONDecoder()

        try:
            obj, _ = decoder.raw_decode(
                text[start:]
            )

            return obj

        except json.JSONDecodeError:
            pass

    # --------------------------------------------------------
    # 4. Nothing worked
    # --------------------------------------------------------

    raise ValueError(
        "The Research Agent response did not contain "
        "valid JSON.\n\n"
        "Raw response:\n"
        + text
    )


# ============================================================
# RESEARCH AGENT
# ============================================================

def research(
    research_question: str
) -> dict:
    """
    Run the Cognilab Research Agent.

    Parameters
    ----------
    research_question : str
        The AI/ML research question to investigate.

    Returns
    -------
    dict
        Research evidence produced by the Research Agent.
    """

    # --------------------------------------------------------
    # Validate input
    # --------------------------------------------------------

    if not isinstance(research_question, str):
        raise TypeError(
            "research_question must be a string."
        )

    if not research_question.strip():
        raise ValueError(
            "research_question cannot be empty."
        )

    # --------------------------------------------------------
    # Prepare input
    # --------------------------------------------------------

    user_input = {
        "research_question": research_question
    }

    user_input_json = json.dumps(
        user_input,
        indent=2,
        ensure_ascii=False
    )

    # --------------------------------------------------------
    # Call Foundry Agent
    # --------------------------------------------------------

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

    # --------------------------------------------------------
    # Extract response text
    # --------------------------------------------------------

    response_text = response.output_text

    if not response_text:
        raise ValueError(
            "The Research Agent returned no response text."
        )

    # --------------------------------------------------------
    # Extract structured research JSON
    # --------------------------------------------------------

    research_evidence = extract_json(
        response_text
    )

    # --------------------------------------------------------
    # Return both:
    # 1. Full human-readable response
    # 2. Structured JSON for downstream agents
    # --------------------------------------------------------

    return {
        "response_text": response_text,
        "research_evidence": research_evidence
    }


# ============================================================
# PIPELINE-FRIENDLY FUNCTION
# ============================================================

def run_research_agent(
    research_question: str
) -> dict:
    """
    Pipeline-friendly wrapper around the Research Agent.
    """

    return research(
        research_question=research_question
    )