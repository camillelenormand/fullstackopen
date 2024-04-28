// blog-list-more/backend/tests/user_api.test.js
const User = require('../models/user')

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const { closeDatabase, clearDatabase } = require('../utils/mongoTestUtils')

const { beforeEach, test, after, describe } = require('node:test')
const assert = require('node:assert')

const { initialUser, usersInDb } = require('./test_helper')

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		for (let user of initialUser) {
			const userObject = new User(user)
			await userObject.save()
		}

		console.log('users saved')
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await usersInDb()
		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await usersInDb()
		assert(usersAtEnd.length === usersAtStart.length + 1)

		const username = usersAtEnd.map((u) => u.username)
		assert(username.includes(newUser.username))
	})

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await usersInDb()
		const newUser = {
			username: 'tester',
			name: 'Matti Luukkainen',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		assert(result.body.error === 'Username must be unique')
		const usersAtEnd = await usersInDb()
		assert(usersAtEnd.length === usersAtStart.length)
	})

	test('creation fails with proper statuscode and message if username is too short', async () => {
		const usersAtStart = await usersInDb()
		const newUser = {
			username: 'ro',
			name: 'Superuser',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		assert(result.body.error ===
			'Username must be at least 3 characters long.',
		)
		const usersAtEnd = await usersInDb()
		assert(usersAtEnd.length === usersAtStart.length)
	})

	test('creation fails if password length is too short', async () => {
		const usersAtStart = await usersInDb()
		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'sa',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		assert(result.body.error === 'Password must be at least 3 characters long.')
		const usersAtEnd = await usersInDb()
		assert(usersAtEnd.length === usersAtStart.length)
	})

	test('creation fails if username is missing', async () => {
		const usersAtStart = await usersInDb()
		const newUser = {
			username: '',
			name: 'Superuser',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		assert(result.body.error === 'Username is required.')
		const usersAtEnd = await usersInDb()
		assert(usersAtEnd.length === usersAtStart.length)
	})

	test('creation fails if password is missing', async () => {
		const usersAtStart = await usersInDb()
		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: '',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		assert(result.body.error === 'Password is required.')
		const usersAtEnd = await usersInDb()
		assert(usersAtEnd.length === usersAtStart.length)
	})
})

after(async () => {
	await clearDatabase()
	await closeDatabase()
})
