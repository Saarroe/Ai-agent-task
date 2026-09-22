import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDate, setEditDate] = useState('')
  

  async function fetchTasks() {
    try {
      const response = await fetch('http://127.0.0.1:8000/tasks')
      
      if (!response.ok) {
      setError('Failed to load tasks')
      return
    }

      const data = await response.json()
      setTasks(data)
    } catch {
      setError('Could not connect to the server')
    }
  }

async function handleSubmit(event) {
  event.preventDefault()

  try {
  const response = await fetch('http://127.0.0.1:8000/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: title,
    date: date,
    completed: false,
  }),
  })

  if (!response.ok) {
      setError('Failed to create task')
      return
    }

  await response.json()
  await fetchTasks()

  setTitle('')
  setDate('')
 } catch {
  setError('Could not connect to the server')
}
}

async function toggleTask(task) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/tasks/${task.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      },
    )

    if (!response.ok) {
      setError('Failed to update task')
      return
    }

    await fetchTasks()
  } catch {
    setError('Could not connect to the server')
  }
}

async function deleteTask(taskId) {
  setError('')

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/tasks/${taskId}`,
      {
        method: 'DELETE',
      },
    )

    if (!response.ok) {
      setError('Failed to delete task')
      return
    }

    await fetchTasks()
  } catch {
    setError('Could not connect to the server')
  }
}
function startEditing(task) {

  if (editingTaskId === task.id) {
    setEditingTaskId(null)
    return
  }

  setEditingTaskId(task.id)
  setEditTitle(task.title)
  setEditDate(task.date.slice(0, 16))
}

async function saveTask(taskId) {
  setError('')

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/tasks/${taskId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editTitle,
          date: editDate,
        }),
      },
    )

    if (!response.ok) {
      setError('Failed to update task')
      return
    }

    await fetchTasks()
    setEditingTaskId(null)
  } catch {
    setError('Could not connect to the server')
  }
}

function cancelEditing() {
  setEditingTaskId(null)
  setEditTitle('')
  setEditDate('')
}


useEffect(() => {
  fetchTasks()
}, [])


  return (
    <main>
      <h1>Todo App</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Task title"
        />
        <input
        type="datetime-local"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        />
          <button type="submit">Add task</button>
      </form>

      {error && <p>{error}</p>}

      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.date}</p>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
            />
            {task.completed ? 'Completed' : 'Pending'}
          </label>
          <br />
          <button
            type="button"
            onClick={() => startEditing(task)}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>

          {editingTaskId === task.id && (
          <div>
            <input
              type="text"
              value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)}
            />

            <input
              type="datetime-local"
              value={editDate}
              onChange={(event) => setEditDate(event.target.value)}
            />

            <button
              type="button"
              onClick={() => saveTask(task.id)}
            >
              Save
            </button>

            <button
              type="button"
              onClick={cancelEditing}
            >
              Cancel
            </button>
          </div>
          )}
          <br />
          <br />
        </div>
      ))}
    </main>
  )
}

export default App