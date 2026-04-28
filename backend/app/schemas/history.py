from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class RunRecordSchema(BaseModel):
    id: int
    task_type: str
    input_text: str
    config_json: dict[str, Any] = Field(default_factory=dict)
    prompt_text: str
    model_name: str
    provider_name: str
    output_text: str
    output_json: dict[str, Any] | None = None
    user_preference: str | None = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
