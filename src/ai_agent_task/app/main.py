from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

tasks = []

class TaskCreate(BaseModel):
    title: str


@app.get("/")
def root():
    return {"message": "Todo API is running"}

@app.get("/tasks")
def get_tasks():
    return tasks


@app.post("/tasks")
def create_task(task: TaskCreate):
    new_task = {
        "id": len(tasks) + 1,
        "title": task.title,
        "completed": False,
    }

    tasks.append(new_task)

    return new_task