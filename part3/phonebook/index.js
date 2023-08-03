require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))
app.use(cors())

morgan.token('req-body', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :response-time ms - :res[content-length] - :req-body'));

// Get persons
app.get("/api/persons", (request, response) => {
  Contact.find({}).then(result => {
    response.json(result)
  })
})

// Information about Phonebook
app.get("/info", (request, response) => {
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

app.get("/api/persons/:id", (request, response) => {
  Contact.findById(request.params.id).then(contact => {
    response.json(contact)
  })
})

// Delete 1 person

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);
  response.status(204).end();
})

// Create 1 person

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    response.status(400).json({ error: 'content missing'})
    return
  }

  const person = new Contact({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})