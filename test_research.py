from agents.research_agent.agent import run_research_agent


question = (
    "Does increasing the embedding dimension of a text "
    "embedding model improve semantic retrieval performance?"
)


result = run_research_agent(question)


print("\n" + "=" * 70)
print("RESEARCH AGENT RESPONSE")
print("=" * 70)

print(result["response_text"])


print("\n" + "=" * 70)
print("STRUCTURED RESEARCH EVIDENCE")
print("=" * 70)

print(result["research_evidence"])