from pydantic import BaseModel, Field
from datetime import datetime


class TaskUpdate(BaseModel):
    title: str | None = None
    date: datetime | None = None
    completed: bool | None = None


class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    date: datetime | None = None
    completed: bool = False