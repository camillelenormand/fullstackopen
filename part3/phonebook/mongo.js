/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
const mongoose = require('mongoose')

// Check console input
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

console.log(process.argv[4])
console.log(process.argv[3])

const url =
  `mongodb+srv://camille-lenormand:${password}@cluster0.52j61a0.mongodb.net/?retryWrites=true&w=majority`

// Connect to MongoDB
mongoose.set('strictQuery',false)
mongoose.connect(url)

console.log('mongoose connected')

// Define a schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
})

// Define a model for contact
const Contact = mongoose.model('Contact', contactSchema)

switch (process.argv.length) {
// If arguments length === 3, display contacts
case 3:
  console.log('phonebook:')
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })
  break
  // If arguments length === 5, add contact
case 5:
  console.log('add contact')
  const name = process.argv[3]
  const number = process.argv[4]
  const contact = new Contact({
    name,
    number
  })
  contact.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
  break
  // Other cases
default:
  console.log('Your console input does not match arguments')
  process.exit(1)
}

