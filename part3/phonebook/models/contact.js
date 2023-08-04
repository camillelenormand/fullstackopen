const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGO_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const contactSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          return value.length >= 3
        },
        message: 'must contain at least 3 characters'
      }
    },
    number: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          const phoneRegex = /^(09-\d{7,}|040-\d{8,})$/
          return phoneRegex.test(value)
        },
        message: 'must be in the following format: 09-1234556 or 040-22334455 with a minimum length of 8 characters.'
      }
    }
  })

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Contact', contactSchema)