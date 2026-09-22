import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'
import {
  getTasks,
  createTask as createTaskApi,
  updateTask,
  deleteTask as deleteTaskApi,
} from './api/tasks'
import AiTaskForm from './components/AiTaskForm'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')

  

  async function fetchTasks() {
  setError('')

  try {
    const data = await getTasks()
    setTasks(data)
  } catch {
    setError('Failed to load tasks')
  }
  }

  async function createTask(title, date) {
    setError('')

    try {
      await createTaskApi(title, date)
      await fetchTasks()
      return true
    } catch {
      setError('Failed to create task')
      return false
    }
  }

  async function toggleTask(task) {
    setError('')

    try {
      await updateTask(task.id, {
        completed: !task.completed,
      })

      await fetchTasks()
    } catch {
      setError('Failed to update task')
    }
  }

  async function deleteTask(taskId) {
    setError('')

    try {
      await deleteTaskApi(taskId)
      await fetchTasks()
    } catch {
      setError('Failed to delete task')
    }
  }

  async function saveTask(taskId, title, date) {
    setError('')

    try {
      await updateTask(taskId, {
        title: title,
        date: date,
      })

      await fetchTasks()
      return true
    } catch {
      setError('Failed to update task')
      return false
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])


  return (
    <main>
      <h1>Todo App</h1>
      
      <TaskForm createTask={createTask} />
      
      <AiTaskForm createTask={createTask} />

      {error && <p>{error}</p>}
      
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          saveTask={saveTask}
        />
      ))}
        
    </main>
  )
}

export default App