import json

from agents.hypothesis_agent.agent import generate_experiment


# --------------------------------------------------
# Controlled test input
# --------------------------------------------------

research_question = (
    "Does increasing the embedding dimension of a text embedding "
    "model improve semantic retrieval performance?"
)

research_evidence = [
    {
        "claim": "Higher-dimensional embeddings can represent richer semantic information.",
        "source": "Research evidence 1"
    },
    {
        "claim": "Embedding dimensionality can affect semantic retrieval quality.",
        "source": "Research evidence 2"
    },
    {
        "claim": "Retrieval experiments should compare embedding configurations using the same evaluation dataset and retrieval procedure.",
        "source": "Research evidence 3"
    }
]


# --------------------------------------------------
# Call Cognilab Hypothesis Agent
# --------------------------------------------------

print("\nCalling Cognilab Hypothesis Agent...\n")

result = generate_experiment(
    research_question=research_question,
    research_evidence=research_evidence
)


# --------------------------------------------------
# Display result
# --------------------------------------------------

print("=" * 60)
print("AGENT RESPONSE")
print("=" * 60)

print(result["response_text"])


print("\n" + "=" * 60)
print("DETERMINISTIC VALIDATION")
print("=" * 60)

print(
    json.dumps(
        result["experiment_plan"]["validation"],
        indent=2
    )
)


print("\n" + "=" * 60)
print("FINAL EXPERIMENT PLAN")
print("=" * 60)

print(
    json.dumps(
        result["experiment_plan"],
        indent=2
    )
)