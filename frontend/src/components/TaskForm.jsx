import { useState } from 'react'

function TaskForm({ createTask }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    
    let taskDate = null

    if (date && time) {
      taskDate = `${date}T${time}`
    } else if (date) {
      taskDate = `${date}T00:00`
    } else if (time) {
      const today = new Date().toISOString().slice(0, 10)
      taskDate = `${today}T${time}`
    }
    
    const success = await createTask(
    title,
    taskDate || null,
    )

    if (success) {
      setTitle('')
      setDate('')
      setTime('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add task</h2>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Task title"
      />

       <input
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />

      <input
        type="time"
        value={time}
        onChange={(event) => setTime(event.target.value)}
      />


      <button type="submit">
        Add task
      </button>
    </form>
  )
}

export default TaskForm

