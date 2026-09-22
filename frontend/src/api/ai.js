const API_URL = 'http://127.0.0.1:8000'

export async function parseTask(text) {
  const response = await fetch(`${API_URL}/ai/parse-task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: text,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to parse task')
  }

  return response.json()
}