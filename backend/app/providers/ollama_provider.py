import json
from typing import Any

import httpx

from app.core.config import settings
from app.providers.base import BaseProvider


class OllamaProvider(BaseProvider):
    def __init__(self, base_url: str | None = None, timeout: float = 120.0) -> None:
        self.base_url = base_url or settings.ollama_base_url
        self.timeout = timeout

    async def generate(self, prompt: str, model: str, temperature: float) -> str:
        payload = {
            "model": model,
            "prompt": prompt,
            "stream": False,
            "options": {"temperature": temperature},
        }

        async with httpx.AsyncClient(timeout=self.timeout) as client:
            response = await client.post(
                f"{self.base_url}/api/generate",
                json=payload,
            )
            response.raise_for_status()

        data = response.json()
        return str(data.get("response", "")).strip()

    async def generate_structured(
        self,
        prompt: str,
        model: str,
        temperature: float,
        schema: dict[str, Any],
    ) -> dict[str, Any]:
        payload = {
            "model": model,
            "prompt": prompt,
            "stream": False,
            "format": schema,
            "options": {"temperature": temperature},
        }

        async with httpx.AsyncClient(timeout=self.timeout) as client:
            response = await client.post(
                f"{self.base_url}/api/generate",
                json=payload,
            )
            response.raise_for_status()

        data = response.json()
        raw_response = str(data.get("response", "")).strip()

        try:
            parsed_output = json.loads(raw_response)
        except json.JSONDecodeError:
            parsed_output = None

        return {
            "response": raw_response,
            "parsed_output": parsed_output,
            "model": data.get("model", model),
            "done": data.get("done", False),
        }
