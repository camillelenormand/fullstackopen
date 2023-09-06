const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
  username: {
    type: String,
    required: true,
    unique: [true, 'Username must be unique'],
    minlength: [3, 'Username must be at least {MINLENGTH} characters long.']
  },
  name: {
    type: String
  },
  passwordHash:{
    type: String,
    required: [true, 'PasswordHash is required'],
    minlength: [3, 'Password must be at least {MINLENGTH} characters long.']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [3, 'Password must be at least {MINLENGTH} characters long.']
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.'})
const User = mongoose.model('User', userSchema)

module.exports = User