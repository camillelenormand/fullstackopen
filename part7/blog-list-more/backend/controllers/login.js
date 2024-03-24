// Import necessary modules
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/user') // Assuming a Mongoose model

const loginRouter = express.Router()

// Login route
loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body

	// Find the user by username
	const user = await User.findOne({ username })
	const passwordCorrect = user === null 
		? false 
		: await bcrypt.compare(password, user.passwordHash)

	if (!(user && passwordCorrect)) {
		return response.status(401).json({ error: 'Invalid password or username' })
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	}

	// Token expires in 1 hour
	const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 3600 })

	console.log(`User ${user.username} logged in successfully`)

	response.status(200).send({ token, username: user.username, name: user.name })
})

// Signup route
loginRouter.post('/signup', async (request, response) => {
	const { username, name, password } = request.body
    
	// Regular expression to check for at least one special character
	const specialCharacterRegex = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/


	// Basic validation for username and password length
	if (password.length < 3 || username.length < 3 || !specialCharacterRegex.test(password)) {
		return response.status(400).json({
			error: 'Password must be at least 3 characters long and contain at least one special character.'
		})
	}

	// Hash the password
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	// Create and save the user
	const user = new User({ username, name, passwordHash })
	const savedUser = await user.save()

	// Respond without including the passwordHash
	response.status(201).json({
		_id: savedUser._id,
		username: savedUser.username,
		name: savedUser.name,
	})
})

module.exports = loginRouter
