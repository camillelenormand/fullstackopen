const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]

// Get persons

app.get('/api/persons', (request, response) => {
  response.json(persons)
  console.log("persons", persons)
})

// Information about Phonebook

app.get('/info', (request, response) => {
  try {
    const contactCount = persons.length;
    const contactList = persons.map(person => `<li>Name: ${person.name}</li><li> Phone number: ${person.number}</li>`).join('');
    const currentDate = new Date();

    const htmlResponse = `
      <p> Phonebook contains ${contactCount} contacts. </p>
      <ul>
        ${contactList}
      </ul>
      <br/>
      <p> ${currentDate} </p>
    `;

    response.send(htmlResponse);
  } catch (error) {
    response.status(500).send('An error occurred while retrieving the phonebook information.');
  }
});

// Get 1 person

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  }
  else {
    response.status(404).end();
  }
})

// Delete 1 person

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);
  response.status(204).end();
})

// Create 1 person

const generateId = () => {
  const maxId = persons.length > 0
  ? Math.max(...persons.map(n => n.id))
  : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    response.status(400).json({
      error: 'content missing'
    })
    return
  }

  if (persons.find(person => person.name === body.name)) {
    response.status(400).json({
      error: 'name must be unique'
    })
    return
  }

  if (persons.find(person => person.number === body.number)) {
    response.status(400).json({
      error: 'number must be unique'
    })
    return
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})