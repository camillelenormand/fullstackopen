const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]


const url =
  `mongodb+srv://camille-lenormand:${password}@cluster0.52j61a0.mongodb.net/?retryWrites=true&w=majority`

  console.log('URL',url)

mongoose.set('strictQuery',false)
mongoose.connect(url)


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

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
  name: 'John Doe',
  number: '1234567890'
})

contact.save().then(result => {
  console.log(`added ${result.name} number ${result.number} to phonebook`)
  mongoose.connection.close()
})