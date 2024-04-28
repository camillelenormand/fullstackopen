// tests/auth_helper.js
const request = require('supertest')
const app = require('../app')
const User = require('../models/user')

const loginUser = async () => {
	const user = new User({ username: 'testuser', password: 'password123' })
	await user.save()

	const res = await request(app)
		.post('/api/login')
		.send({ username: 'testuser', password: 'password123' })

	return res.body.token
}

module.exports = { loginUser }
