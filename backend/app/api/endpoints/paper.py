from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas import PaperSummarizeRequest, PromptTemplate, TaskConfig, TaskInput, WorkflowRunResult
from app.services import run_workflow
from app.utils.prompts import PAPER_SUMMARY_SYSTEM_PROMPT, build_paper_summary_prompt_template
from app.schemas.paper import PaperSummaryOutput

router = APIRouter(prefix="/paper", tags=["paper"])


@router.post("/summarize", response_model=WorkflowRunResult)
async def summarize_paper(
    payload: PaperSummarizeRequest,
    db: Session = Depends(get_db),
) -> WorkflowRunResult:
    task_input = TaskInput(
        raw_input=payload.paper_text,
        task_type="paper_summarizer",
        metadata={"summary_mode": payload.summary_mode},
    )
    task_config = TaskConfig(
        model=payload.model,
        temperature=payload.temperature,
        provider_name="ollama",
        structured_output=True,
        output_schema=PaperSummaryOutput.model_json_schema(),
    )
    prompt_template = PromptTemplate(
        system_instruction=PAPER_SUMMARY_SYSTEM_PROMPT,
        user_prompt_template=build_paper_summary_prompt_template(payload.summary_mode),
    )

    return await run_workflow(
        task_input=task_input,
        task_config=task_config,
        prompt_template=prompt_template,
        db=db,
    )
