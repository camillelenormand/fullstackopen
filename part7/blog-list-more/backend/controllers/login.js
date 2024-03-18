const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body

	const user = await User.findOne({ username })
	const passwordCorrect =
		user === null ? false : await bcrypt.compare(password, user.passwordHash)

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'invalid password or username',
		})
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	}

	// Token expires in 60*60 seconds, i.e 1 hour
	const token = jwt.sign(userForToken, process.env.SECRET, {
		expiresIn: 60 * 60,
	})

	// Log success message
	console.log(`User ${user.username} logged in successfully`)

	response
		.status(200)
		.send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
