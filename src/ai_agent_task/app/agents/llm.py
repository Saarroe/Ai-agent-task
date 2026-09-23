from __future__ import annotations

import json
import os
from datetime import datetime

from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel

load_dotenv()

class ParsedTask(BaseModel):
    title: str
    date: datetime | None = None


def parse_task(text: str) -> ParsedTask:
    api_key = os.getenv("OPENAI_API_KEY")
    model = os.getenv("OPENAI_MODEL")

    # Fallback when OpenAI is not configured
    if not api_key or not model:
        return ParsedTask(
            title=text,
            date=None,
        )

    client = OpenAI(api_key=api_key)

    try:
        return _parse_task_with_openai(
            client=client,
            text=text,
            model=model,
        )
    except Exception:
        # Keep the Todo application usable even if the LLM call fails
        return ParsedTask(
            title=text,
            date=None,
        )


def _parse_task_with_openai(
    client: OpenAI,
    text: str,
    model: str,
) -> ParsedTask:
    prompt = _build_prompt(text)

    schema = {
        "type": "object",
        "properties": {
            "title": {
                "type": "string",
            },
            "date": {
                "type": ["string", "null"],
            },
        },
        "required": ["title", "date"],
        "additionalProperties": False,
    }

    response = client.responses.create(
        model=model,
        input=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": prompt,
                    }
                ],
            }
        ],
        text={
            "format": {
                "type": "json_schema",
                "name": "task_extraction",
                "strict": True,
                "schema": schema,
            }
        },
    )

    data = json.loads(response.output_text)

    return ParsedTask(**data)


def _build_prompt(text: str) -> str:
    now = datetime.now()

    return f"""
Extract a todo task from the user's message.

Current date and time:
{now.isoformat()}

User message:
{text}

Rules:
- Create a concise task title with a maximum of 200 characters.
- If the input does not contain a meaningful todo task, use the original input as the title with max 200 characters.
- Convert relative dates such as "tomorrow" or "next Monday"
  into an ISO 8601 datetime.
- If no date or time is mentioned, return null for date.
- If the user gives an approximate time of day, use these defaults:
  - morning = 08:00
  - afternoon = 14:00
  - evening = 18:00
- Apply these defaults also to equivalent expressions in other languages.
""".strip()