from contextlib import asynccontextmanager
from fastapi import FastAPI
from .routes.tasks import router as tasks_router
from .database import create_db_and_tables

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(tasks_router)


    
@app.get("/")
def root():
    return {"message": "Todo API is running"}