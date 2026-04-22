from fastapi import FastAPI

from app.core.config import settings


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Backend API for the AI Research Workflow Lab.",
)


@app.get("/health", tags=["system"])
def health_check() -> dict[str, str]:
    return {"status": "ok"}
