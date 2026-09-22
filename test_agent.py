from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

endpoint = "https://tvisha9a3810-7561-resource.services.ai.azure.com/api/projects/tvisha9a3810-7561"

project_client = AIProjectClient(
    endpoint=endpoint,
    credential=DefaultAzureCredential(),
)

openai_client = project_client.get_openai_client()

response = openai_client.responses.create(
    input=[
        {
            "role": "user",
            "content": "Briefly explain what you can help with as Cognilab's Hypothesis and Experiment Design Agent."
        }
    ],
    extra_body={
        "agent_reference": {
            "name": "cognilab-hypothesis-designer",
            "version": "4",
            "type": "agent_reference"
        }
    },
)

print("\n--- AGENT RESPONSE ---\n")
print(response.output_text)