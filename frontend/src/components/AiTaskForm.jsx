import { useState } from 'react'
import { parseTask } from '../api/ai'

function AiTaskForm({ createTask }) {
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    
    try {
    const parsedTask = await parseTask(text)

    const success = await createTask(
      parsedTask.title,
      parsedTask.date,
    )

    if (success) {
      setText('')
    }
    } catch (error) {
      setError(error.message)
    }
}

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add task with AI</h2>

      <input
        type="text"
        value={text}
        maxLength={500}
        onChange={(event) => setText(event.target.value)}
        placeholder="e.g. Gym tomorrow at 6pm"
      />

      <button type="submit">
        Create with AI
      </button>
      {error && <p>{error}</p>}
    </form>
    
  )
}

export default AiTaskForm