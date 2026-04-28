from typing import Literal

from pydantic import BaseModel, Field


class PaperSummaryOutput(BaseModel):
    title: str = Field(default="", description="Title of the paper.")
    short_summary: str = Field(default="", description="Short overview of the paper.")
    research_problem: str = Field(default="", description="Core research problem.")
    methodology: str = Field(default="", description="Main method or approach.")
    dataset_or_subject: str = Field(default="", description="Dataset, subject, or data source.")
    metrics_or_evaluation_method: str = Field(
        default="",
        description="Metrics or evaluation method used in the paper.",
    )
    main_contributions: list[str] = Field(
        default_factory=list,
        description="Key contributions of the paper.",
    )
    limitations: list[str] = Field(
        default_factory=list,
        description="Main limitations or weaknesses.",
    )
    possible_research_gap: str = Field(
        default="",
        description="Possible research gap or future direction.",
    )
    keywords: list[str] = Field(default_factory=list, description="Keywords of the paper.")


class PaperSummarizeRequest(BaseModel):
    paper_text: str = Field(min_length=1)
    summary_mode: Literal["short", "standard", "detailed"] = "standard"
    model: str = "llama3.2"
    temperature: float = Field(default=0.3, ge=0.0, le=2.0)
