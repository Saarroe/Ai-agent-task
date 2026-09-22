import { useState } from 'react'

function TaskForm({ createTask }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    const success = await createTask(title, date)

    if (success) {
      setTitle('')
      setDate('')
    }
  }

  return (
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

      <button type="submit">
        Add task
      </button>
    </form>
  )
}

export default TaskForm

