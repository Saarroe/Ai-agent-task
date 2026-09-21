from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from ..schemas import TaskCreate, TaskUpdate
from ..database import get_session
from ..models import Task


router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("")
def get_tasks(session: Session = Depends(get_session)):
    tasks = session.exec(select(Task)).all()
    return tasks


@router.post("")
def create_task(
    task: TaskCreate,
    session: Session = Depends(get_session),
):
    new_task = Task(
        title=task.title,
        date=task.date,
        completed=task.completed,
    )

    session.add(new_task)
    session.commit()
    session.refresh(new_task)

    return new_task


@router.patch("/{task_id}")
def update_task(
    task_id: int,
    update: TaskUpdate,
    session: Session = Depends(get_session),
):
    task = session.get(Task, task_id)

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    if update.title is not None:
        task.title = update.title

    if update.completed is not None:
        task.completed = update.completed

    if update.date is not None:
        task.date = update.date

    session.add(task)
    session.commit()
    session.refresh(task)

    return task


@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    session: Session = Depends(get_session),
):
    task = session.get(Task, task_id)

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    session.delete(task)
    session.commit()

    return {"message": "Task deleted"}