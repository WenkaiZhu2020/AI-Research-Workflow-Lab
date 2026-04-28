from abc import ABC, abstractmethod
from typing import Any


class BaseProvider(ABC):
    @abstractmethod
    async def generate(self, prompt: str, model: str, temperature: float) -> str:
        pass

    async def generate_structured(
        self,
        prompt: str,
        model: str,
        temperature: float,
        schema: dict[str, Any],
    ) -> dict[str, Any]:
        raise NotImplementedError("Structured generation is not implemented.")
