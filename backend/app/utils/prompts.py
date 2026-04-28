import json

from app.schemas.paper import PaperSummaryOutput
from app.schemas.repo import RepoExplanationOutput

PAPER_SUMMARY_SYSTEM_PROMPT = """
You are an academic research assistant.
Read the provided paper content carefully and return a faithful structured summary.
Do not invent facts. If some information is missing, return an empty string or an empty list.
Keep the language concise, precise, and engineering-friendly.
""".strip()

REPO_EXPLAINER_SYSTEM_PROMPT = """
You are a software architecture explainer.
Analyze the provided repository context and return a structured explanation that helps a beginner
or engineer understand the project quickly. Do not fabricate files or modules that are not implied
by the input. If something is unclear, state it conservatively.
""".strip()


def build_paper_summary_prompt_template(summary_mode: str) -> str:
    output_schema = json.dumps(PaperSummaryOutput.model_json_schema(), ensure_ascii=False, indent=2)
    return (
        "Summarize the paper content below.\n"
        f"Summary mode: {summary_mode}.\n"
        "Return valid JSON that follows this schema exactly:\n"
        f"{output_schema}\n\n"
        "Paper content:\n{{input}}"
    )


def build_repo_explainer_prompt_template(explanation_depth: str) -> str:
    output_schema = json.dumps(RepoExplanationOutput.model_json_schema(), ensure_ascii=False, indent=2)
    return (
        "Explain the repository context below.\n"
        f"Explanation depth: {explanation_depth}.\n"
        "Return valid JSON that follows this schema exactly:\n"
        f"{output_schema}\n\n"
        "Repository context:\n{{input}}"
    )
