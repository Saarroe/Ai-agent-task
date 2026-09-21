from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Todo API is running"}

@app.get("/tasks")
def get_tasks():
    return []