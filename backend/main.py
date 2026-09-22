from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.research import router as research_router


app = FastAPI(
    title="Cognilab API",
    description=(
        "Backend API for the Cognilab "
        "AI research experimentation platform."
    ),
    version="1.0.0"
)


# ==================================================
# CORS
# ==================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================================================
# ROUTES
# ==================================================

app.include_router(
    research_router
)


# ==================================================
# HEALTH CHECK
# ==================================================

@app.get("/")
def root():

    return {
        "name": "Cognilab API",
        "status": "running"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }