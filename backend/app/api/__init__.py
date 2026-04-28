from fastapi import APIRouter

from app.api.endpoints.history import router as history_router
from app.api.endpoints.paper import router as paper_router
from app.api.endpoints.prompt_lab import router as prompt_lab_router
from app.api.endpoints.repo import router as repo_router

api_router = APIRouter()
api_router.include_router(prompt_lab_router)
api_router.include_router(history_router)
api_router.include_router(paper_router)
api_router.include_router(repo_router)

__all__ = ["api_router"]
