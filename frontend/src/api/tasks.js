const API_URL = 'http://127.0.0.1:8000'

export async function getTasks() {
  const response = await fetch(`${API_URL}/tasks`)

  if (!response.ok) {
    throw new Error('Failed to load tasks')
  }

  return response.json()
}

export async function createTask(title, date) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      date: date || null,
      completed: false,
    }),
  })
  
  if (response.status === 422) {
    throw new Error('Too large input')
  }

  if (!response.ok) {
    throw new Error('Failed to create task')
  }
}

export async function updateTask(taskId, updates) {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })

  if (!response.ok) {
    throw new Error('Failed to update task')
  }
}

export async function deleteTask(taskId) {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete task')
  }
}