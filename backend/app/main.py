from fastapi import FastAPI

from app.core.config import settings
from app.db.base import Base
from app.db.session import engine


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Backend API for the AI Research Workflow Lab.",
)


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)


@app.get("/health", tags=["system"])
def health_check() -> dict[str, str]:
    return {"status": "ok"}
