require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] - :req-body'));


morgan.token('req-body', (req) => {
  return JSON.stringify(req.body);
});


// Get persons
app.get("/api/persons", (request, response) => {
  console.log(request.body)
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
  Contact.findById(request.params.id)
    .then(contact => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      } 
    })
    .catch(error => {
      next(error)
    })
})

// Delete 1 person

app.delete("/api/persons/:id", (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(result => {
    response.status(204).end()
  })
    .catch(error => {
      next(error)
    })
})

// Create 1 person

app.post("/api/persons", (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name missing'})
  }

  if (!body.number) {
    return response.status(400).json({ error: 'number missing'})
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact.save()
    .then(savedContact => {
      response.json(savedContact)
    })
    .catch(error => {
      next(error)
    })
})

// Update 1 person

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body

  const contact = {
    name: body.name,
    number: body.number
  }

  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => {
      next(error)
    })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}

app.use(errorHandler)
app.use(requestLogger)

