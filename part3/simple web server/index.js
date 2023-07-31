const express = require('express')

const app = express()

app.use(express.json())

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: today.toDateString(),
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: today.toDateString(),
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP',
    date: today.toDateString(),
    important: true
  }
]

// Get a note
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  
  if (note) {
    response.json(note)
  } else {
    response.message = "Note not found"
    response.status(404).end()
  }
})

// Delete a note
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

// Gell all notes
app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const generateId = () => {
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => n.id))
  : 0
  return maxId + 1
}

// Create a note
app.post('/api/notes', (request, response) => {
  const body = request.body
  
  if (!body.content) {
    response.status(400).json({
      error: 'content missing'
    })
    return
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)
  
  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})