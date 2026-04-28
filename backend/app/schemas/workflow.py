from typing import Any

from pydantic import BaseModel, Field


class TaskConfig(BaseModel):
    model: str
    temperature: float = Field(default=0.7, ge=0.0, le=2.0)
    top_p: float | None = Field(default=None, ge=0.0, le=1.0)
    provider_name: str = "ollama"
    structured_output: bool = False


class PromptTemplate(BaseModel):
    system_instruction: str = ""
    user_prompt_template: str


class TaskInput(BaseModel):
    raw_input: str = Field(min_length=1)
    task_type: str
    metadata: dict[str, Any] = Field(default_factory=dict)


class WorkflowRunResult(BaseModel):
    run_id: int
    output_text: str
    output_json: dict[str, Any] | None = None
    prompt_text: str


class PromptExperimentRequest(BaseModel):
    task_input: TaskInput
    task_config: TaskConfig
    prompt_template: PromptTemplate
