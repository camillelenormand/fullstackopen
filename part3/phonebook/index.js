const express = require('express')
const app = express()

app.use(express.json())

const persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
    age : 10
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

//Get 1 person

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



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})