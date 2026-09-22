import { useState } from 'react'

function TaskItem({ task, toggleTask, deleteTask, saveTask }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(task.title)
    const [editDate, setEditDate] = useState(
        task.date ? task.date.slice(0, 16) : ''
    )
    
    function startEditing() {
    setEditTitle(task.title)
    setEditDate(task.date ? task.date.slice(0, 16) : '')
    setIsEditing(true)
    }

    function cancelEditing() {
    setEditTitle(task.title)
    setEditDate(task.date ? task.date.slice(0, 16) : '')
    setIsEditing(false)
    }

    async function handleSave() {
    const success = await saveTask(task.id, editTitle, editDate)

    if (success) {
        setIsEditing(false)
    }
    }

    return (
        <div>
        <h2>{task.title}</h2>
        <p>{task.date ? task.date : 'No due date'}</p>

        <label>
            <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task)}
            />
            {task.completed ? 'Completed' : 'Pending'}
        </label>

        <br />
        <br />

        <button
            type="button"
            onClick={startEditing}
            >
            Edit
        </button>

        <button
            type="button"
            onClick={() => deleteTask(task.id)}
        >
            Delete
        </button>
        <br />

        {isEditing && (
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
            onClick={handleSave}
          >
            Save
          </button>

          <button
            type="button"
            onClick={cancelEditing}
          >
            Cancel
          </button>
          <br />
        </div>
      )}
    </div>
    )
}

export default TaskItem