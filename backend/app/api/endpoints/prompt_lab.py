from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas import PromptExperimentRequest, WorkflowRunResult
from app.services import run_workflow

router = APIRouter(prefix="/prompt", tags=["prompt"])


@router.post("/run", response_model=WorkflowRunResult)
async def run_prompt_experiment(
    payload: PromptExperimentRequest,
    db: Session = Depends(get_db),
) -> WorkflowRunResult:
    return await run_workflow(
        task_input=payload.task_input,
        task_config=payload.task_config,
        prompt_template=payload.prompt_template,
        db=db,
    )
