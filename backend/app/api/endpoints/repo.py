from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas import PromptTemplate, RepoExplainRequest, TaskConfig, TaskInput, WorkflowRunResult
from app.schemas.repo import RepoExplanationOutput
from app.services import run_workflow
from app.utils.prompts import REPO_EXPLAINER_SYSTEM_PROMPT, build_repo_explainer_prompt_template

router = APIRouter(prefix="/repo", tags=["repo"])


@router.post("/explain", response_model=WorkflowRunResult)
async def explain_repo(
    payload: RepoExplainRequest,
    db: Session = Depends(get_db),
) -> WorkflowRunResult:
    combined_input = (
        f"Repository Tree:\n{payload.repo_tree_text.strip()}\n\n"
        f"README:\n{payload.readme_text.strip()}\n\n"
        f"Code Snippets:\n{payload.code_snippets.strip()}"
    ).strip()

    task_input = TaskInput(
        raw_input=combined_input,
        task_type="repo_explainer",
        metadata={"explanation_depth": payload.explanation_depth},
    )
    task_config = TaskConfig(
        model=payload.model,
        temperature=payload.temperature,
        provider_name="ollama",
        structured_output=True,
        output_schema=RepoExplanationOutput.model_json_schema(),
    )
    prompt_template = PromptTemplate(
        system_instruction=REPO_EXPLAINER_SYSTEM_PROMPT,
        user_prompt_template=build_repo_explainer_prompt_template(payload.explanation_depth),
    )

    return await run_workflow(
        task_input=task_input,
        task_config=task_config,
        prompt_template=prompt_template,
        db=db,
    )
