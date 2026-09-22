from azure.identity import (
    InteractiveBrowserCredential,
    TokenCachePersistenceOptions
)

TENANT_ID = "c3e02fe4-fe78-4dc4-aee7-e3951ae8862f"

cache_options = TokenCachePersistenceOptions(
    name="cognilab-auth"
)

credential = InteractiveBrowserCredential(
    tenant_id=TENANT_ID,
    cache_persistence_options=cache_options
)