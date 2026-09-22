from contextlib import asynccontextmanager
from fastapi import FastAPI
from .routes.tasks import router as tasks_router
from .routes.ai import router as ai_router
from .database import create_db_and_tables
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks_router)
app.include_router(ai_router)

    
@app.get("/")
def root():
    return {"message": "Todo API is running"}