import { useState } from 'react'
import { parseTask } from '../api/ai'

function AiTaskForm({ createTask }) {
  const [text, setText] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    const parsedTask = await parseTask(text)

    const success = await createTask(
      parsedTask.title,
      parsedTask.date,
    )

    if (success) {
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add task with AI</h2>

      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="e.g. Gym tomorrow at 6pm"
      />

      <button type="submit">
        Create with AI
      </button>
    </form>
  )
}

export default AiTaskForm