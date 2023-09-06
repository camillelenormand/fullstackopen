const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// New user
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  if (!password || password.length < 3) {
    return response.status(400).json({
      error: 'Password must be at least 3 characters long.'
    })
  }

  const passwordSaved = await bcrypt.compare(password, user.passwordHash)
  console.log('checkPassword', passwordSaved)
  if (!passwordSaved) {
    return response.status(401).json({
      error: 'Invalid password'
    })
  }
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

// Get all users
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

// Get a specific user
usersRouter.get('/:id', async (request, response) => {
  const user = await User
    .findById(request.params.id).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(user)
})


module.exports = usersRouter