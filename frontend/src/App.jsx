import './App.css'

function App() {
  const tasks = [
    {
      id: 1,
      title: 'Testiing fastapi',
      date: '2026-09-22T18:00:00',
      completed: false,
    },
    {
      id: 2,
      title: 'Build ai',
      date: '2026-09-23T12:00:00',
      completed: true,
    },
    {
      id: 3,
      title: 'Write README',
      date: '2026-09-24T17:00:00',
      completed: false,
    },
  ]

  return (
    <main>
      <h1>Todo App</h1>

      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.date}</p>
          <p>{task.completed ? 'Completed' : 'Pending'}</p>
        </div>
      ))}
    </main>
  )
}

export default App