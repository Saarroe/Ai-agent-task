from fastapi import APIRouter
from ..schemas import TaskCreate, TaskUpdate

tasks = []

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("/tasks")
def get_tasks():
    return tasks


@router.post("/tasks")
def create_task(task: TaskCreate):
    new_task = {
        "id": len(tasks) + 1,
        "title": task.title,
        "date": task.date,
        "completed": task.completed,
    }

    tasks.append(new_task)

    return new_task

@router.patch("/tasks/{task_id}")
def update_task(task_id: int, update: TaskUpdate):
    for task in tasks:
        if task["id"] == task_id:
            if update.title is not None:
                task["title"] = update.title

            if update.completed is not None:
                task["completed"] = update.completed

            if update.date is not None:
                task["date"] = update.date

            return task

    return {"error": "Task not found"}


@router.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    for task in tasks:
        if task["id"] == task_id:
            tasks.remove(task)
            return {"message": "Task deleted"}

    return {"error": "Task not found"}