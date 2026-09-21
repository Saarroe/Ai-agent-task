from pydantic import BaseModel
from datetime import datetime


class TaskUpdate(BaseModel):
    title: str | None = None
    date: datetime | None = None
    completed: bool | None = None


class TaskCreate(BaseModel):
    title: str
    date: datetime
    completed: bool = False