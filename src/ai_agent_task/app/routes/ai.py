from fastapi import APIRouter
from pydantic import BaseModel, Field

from ..agents.llm import ParsedTask, parse_task


router = APIRouter(prefix="/ai", tags=["AI"])


class ParseTaskRequest(BaseModel):
    text: str = Field(min_length=1, max_length=500)


@router.post("/parse-task", response_model=ParsedTask)
def parse_task_endpoint(request: ParseTaskRequest):
    return parse_task(request.text)