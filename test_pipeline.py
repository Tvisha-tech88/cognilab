from pipeline import run_cognilab_pipeline


question = (
    "Does increasing the embedding dimension of a text "
    "embedding model improve semantic retrieval performance?"
)


result = run_cognilab_pipeline(question)


print("\n" + "=" * 70)
print("COGNILAB PIPELINE")
print("=" * 70)


print("\n" + "=" * 70)
print("AGENT 1 — RESEARCH")
print("=" * 70)

print(
    result["research"]["response_text"]
)


print("\n" + "=" * 70)
print("AGENT 2 — HYPOTHESIS + EXPERIMENT")
print("=" * 70)

print(
    result["experiment"]["response_text"]
)


print("\n" + "=" * 70)
print("FINAL EXPERIMENT PLAN")
print("=" * 70)

print(
    result["experiment"]["experiment_plan"]
)