from datetime import datetime

from sqlmodel import Field, SQLModel


class Task(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    date: datetime | None = None
    completed: bool = False