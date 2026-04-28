import json
from time import perf_counter
from typing import Any

from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models import RunRecord
from app.providers import BaseProvider, OllamaProvider
from app.schemas import PromptTemplate, TaskConfig, TaskInput, WorkflowRunResult


def build_prompt(task_input: TaskInput, prompt_template: PromptTemplate) -> str:
    user_prompt = prompt_template.user_prompt_template.replace(
        "{{input}}",
        task_input.raw_input,
    )

    if "{{input}}" not in prompt_template.user_prompt_template:
        user_prompt = f"{prompt_template.user_prompt_template}\n\nInput:\n{task_input.raw_input}"

    if prompt_template.system_instruction.strip():
        return (
            f"System Instruction:\n{prompt_template.system_instruction.strip()}\n\n"
            f"User Prompt:\n{user_prompt.strip()}"
        )

    return user_prompt.strip()


def parse_output(raw_output: str, structured_output: bool) -> dict[str, Any] | None:
    if not structured_output:
        return None

    try:
        parsed = json.loads(raw_output)
    except json.JSONDecodeError:
        return None

    return parsed if isinstance(parsed, dict) else {"data": parsed}


async def run_workflow(
    task_input: TaskInput,
    task_config: TaskConfig,
    prompt_template: PromptTemplate,
    db: Session | None = None,
    provider: BaseProvider | None = None,
) -> WorkflowRunResult:
    owns_session = db is None
    session = db or SessionLocal()
    provider_client = provider or OllamaProvider()

    prompt_text = build_prompt(task_input, prompt_template)
    start_time = perf_counter()
    output_text = await provider_client.generate(
        prompt=prompt_text,
        model=task_config.model,
        temperature=task_config.temperature,
    )
    latency_ms = round((perf_counter() - start_time) * 1000, 2)
    output_json = parse_output(output_text, task_config.structured_output)

    config_payload = task_config.model_dump()
    config_payload["latency_ms"] = latency_ms

    record = RunRecord(
        task_type=task_input.task_type,
        input_text=task_input.raw_input,
        config_json=config_payload,
        prompt_text=prompt_text,
        model_name=task_config.model,
        provider_name=task_config.provider_name,
        output_text=output_text,
        output_json=output_json,
    )

    try:
        session.add(record)
        session.commit()
        session.refresh(record)
    finally:
        if owns_session:
            session.close()

    return WorkflowRunResult(
        run_id=record.id,
        output_text=output_text,
        output_json=output_json,
        prompt_text=prompt_text,
    )
