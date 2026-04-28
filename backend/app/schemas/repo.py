from typing import Literal

from pydantic import BaseModel, Field


class RepoExplanationOutput(BaseModel):
    project_overview: str = Field(default="", description="Overall summary of the repository.")
    main_modules: list[str] = Field(default_factory=list, description="Main modules or folders.")
    module_responsibilities: list[str] = Field(
        default_factory=list,
        description="Responsibilities of key modules.",
    )
    likely_entry_points: list[str] = Field(
        default_factory=list,
        description="Likely application entry points.",
    )
    important_files_to_read_first: list[str] = Field(
        default_factory=list,
        description="Files a reader should inspect first.",
    )
    suggested_reading_order: list[str] = Field(
        default_factory=list,
        description="Recommended reading order.",
    )
    architecture_notes: list[str] = Field(
        default_factory=list,
        description="Important architecture observations.",
    )
    technologies_used: list[str] = Field(
        default_factory=list,
        description="Likely technologies and frameworks used.",
    )
    possible_risks_or_messy_areas: list[str] = Field(
        default_factory=list,
        description="Potential risks or messy areas in the codebase.",
    )


class RepoExplainRequest(BaseModel):
    repo_tree_text: str = ""
    readme_text: str = ""
    code_snippets: str = ""
    explanation_depth: Literal["beginner", "normal", "technical"] = "normal"
    model: str = "llama3.2"
    temperature: float = Field(default=0.2, ge=0.0, le=2.0)
