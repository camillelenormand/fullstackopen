const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Get all users
usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', {
		url: 1,
		title: 1,
		author: 1,
		id: 1,
	})
	response.json(users)
})


// New user
usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body
	
	if (!username || !password) {
		return response.status(400).json({
			error: 'Username and password are required.',
		})
	}

	if (!password || password.length < 3) {
		return response.status(400).json({
			error: 'Password must be at least 3 characters long.',
		})
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		passwordHash,
	})


	const passwordSaved = await bcrypt.compare(password, user.passwordHash)
	if (!passwordSaved) {
		return response.status(401).json({
			error: 'Invalid password',
		})
	}

	const savedUser = await user.save()
	response.status(201).json(savedUser)
})

// Get a specific user
usersRouter.get('/:id', async (request, response) => {
	const user = await User.findById(request.params.id).populate('blogs', {
		url: 1,
		title: 1,
		author: 1,
	})
	response.json(user)
})

// Delete a user
usersRouter.delete('/:id', async (request, response) => {
	await User.findByIdAndDelete(request.params.id)
	response.status(204).end()
})


module.exports = usersRouter
