# AI Todo App

A small full-stack Todo application built with React and FastAPI. Tasks are persisted locally in SQLite.

The application also includes a lightweight LLM feature that converts natural-language input such as:

> `Return assignment tomorrow at 18`

into a structured task with a title and due date.

## Tech Stack

* **Frontend:** React, JavaScript, Vite
* **Backend:** Python, FastAPI, SQLModel
* **Database:** SQLite
* **AI:** OpenAI API

## Features

* Create, edit and delete tasks
* Mark tasks as completed
* Optional due dates
* Create tasks using natural language with an LLM
* Graceful fallback when the OpenAI API is unavailable or not configured

## Running Locally

### Backend

Create a `.env` file based on `.env.example`:

```text
OPENAI_API_KEY=your-api-key
OPENAI_MODEL=your-model
```

Install dependencies and start the API:

```bash
uv sync
uv run uvicorn ai_agent_task.app.main:app --reload --app-dir src
```

The API runs at `http://127.0.0.1:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

## LLM Design

The LLM extracts a concise task title and optional due date from natural-language input using structured JSON output.

If the OpenAI API is unavailable or not configured, the original input is used as the task title and the due date is left empty.

## Design Decisions

The application is intentionally kept small and simple. FastAPI and SQLModel provide a typed backend, while SQLite provides lightweight local persistence without additional infrastructure.

Task routes and AI logic are separated to keep responsibilities clear. The LLM is only responsible for converting natural-language input into structured task data.

## Tests

Run the tests with:

```bash
uv run pytest
```
