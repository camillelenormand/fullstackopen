// blog-list-more/backend/tests/blog_api.test.js
const supertest = require('supertest')
const { closeDatabase, clearDatabase } = require('../utils/mongoTestUtils')
const app = require('../app')
const { beforeEach, test, after, describe } = require('node:test')
const assert = require('node:assert')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const { initialUser, initialBlogs, blogsInDb } = require('./test_helper')

let authHeader

describe('Initialisation of the testings: creation of a user and log in as this user', () => {
	beforeEach(async () => {
		await User.deleteMany({})
		// Create a user
		const user = initialUser[0]
		await api
			.post('/api/users')
			.send(user)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		// Login
		const loginResponse = await api
			.post('/api/login')
			.send(user)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		authHeader = `Bearer ${loginResponse.body.token}`
	})

	describe('When there are some blogs already in MongoDB', () => {
		beforeEach(async () => {
			await Blog.deleteMany({})
			await Blog.insertMany(initialBlogs)
			console.log('Blogs inserted')
		})

		test('blogs are returned as json', async () => {
			const response = await api
				.get('/api/blogs')
				.expect(200)
				.expect('Content-Type', /application\/json/)

			assert(response.body.blogs.length === initialBlogs.length)
		})

		test('a blog has an id property', async () => {
			const response = await api
				.get('/api/blogs')
				.expect(200)
			const blog = response.body.blogs[0]

			assert(blog.id)
		})

		test('a blog can be updated', async () => {
			const [blogToUpdate] = await blogsInDb()

			const updatedBlog = {
				...blogToUpdate,
				title: 'Updated title'
			}

			await api
				.put(`/api/blogs/${blogToUpdate.id}`)
				.send(updatedBlog)
				.expect(200)

			const blogs = await blogsInDb()

			const titles = blogs.map((blog) => blog.title)

			assert(titles.includes('Updated title'))
		})

		describe('Inserting a new blog', () => {
			test('is ok with comprehensive data', async () => {
				const newBlog = {
					title: 'New blog',
					author: 'John Doe',
					url: 'https://example.com',
					likes: 10
				}

				await api
					.post('/api/blogs')
					.set('Authorization', authHeader)
					.send(newBlog)
					.expect(201)
					.expect('Content-Type', /application\/json/)

				const blogs = await blogsInDb()

				// Check that the new blog was added
				assert(blogs.length === initialBlogs.length + 1)

				// Check that the new blog is in the list
				const titles = blogs.map((blog) => blog.title)
				assert(titles.includes('New blog'))

			})
		})

		test('includes likes set to 0 by default if not provided', async () => {
			const newBlog = {
				title: 'New blog',
				author: 'John Doe',
				url: 'https://example.com'
			}

			const response = await api
				.post('/api/blogs')
				.set('Authorization', authHeader)
				.send(newBlog)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			assert(response.body.likes === 0)
		})

		test('fails if title is missing', async () => {
			const newBlog = {
				title: '',
				author: 'John Doe',
				url: 'https://example.com',
				likes: 10
			}

			const response = await api
				.post('/api/blogs')
				.set('Authorization', authHeader)
				.send(newBlog)
				.expect(400)
				.expect('Content-Type', /application\/json/)

			assert(response.body.error === 'Title is required')

		})

		test('fails if url is missing', async () => {
			const newBlog = {
				title: 'New blog',
				author: 'John Doe',
				url: '',
				likes: 10
			}

			const response = await api
				.post('/api/blogs')
				.set('Authorization', authHeader)
				.send(newBlog)
				.expect(400)
				.expect('Content-Type', /application\/json/)

			assert(response.body.error === 'URL is required')
		})

		test('fails if author is missing', async () => {
			const newBlog = {
				title: 'New blog',
				url: 'https://example.com',
				likes: 10
			}

			const response = await api
				.post('/api/blogs')
				.set('Authorization', authHeader)
				.send(newBlog)
				.expect(400)
				.expect('Content-Type', /application\/json/)

			assert(response.body.error === 'Author is required')
		})
	})
})

describe('a blog', () => {
	let id
	beforeEach(async () => {
		await Blog.deleteMany({})

		const newBlog = {
			title: 'New blog',
			author: 'John Doe',
			url: 'https://example.com',
			likes: 10
		}

		const response = await api
			.post('/api/blogs')
			.set('Authorization', authHeader)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)


		id = response.body.id
	})

	test('can be deleted', async () => {
		await api
			.delete(`/api/blogs/${id}`)
			.set('Authorization', authHeader)
			.expect(204)

		const blogs = await blogsInDb()

		assert(blogs.length === 0)
	})

	test('can be deleted by the admin', async () => {
		const blogToDelete = await blogsInDb()

		await api
			.delete(`/api/blogs/${blogToDelete[0].id}`)
			.set('Authorization', authHeader)
			.expect(204)

		const blogs = await blogsInDb()

		assert(blogs.length === 0)
	})

	test('cannot be deleted by a user with invalid auth header', async () => {
		const blogToDelete = await blogsInDb()

		await api
			.delete(`/api/blogs/${blogToDelete[0].id}`)
			.expect(401)

		const blogs = await blogsInDb()
		assert(blogs.length === 1)
	})

	test('cannot be deleted by a user who did not create it', async () => {
		const blogToDelete = await blogsInDb()
		const user = {
			username: 'User2',
			name: 'User2',
			password: 'password'
		}

		await api
			.post('/api/users')
			.send(user)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const loginResponse = await api
			.post('/api/login')
			.send(user)
			.expect(200)
			.expect('Content-Type', /application\/json/)
		
		const anotherUserAuthHeader = `Bearer ${loginResponse.body.token}`
		await api
			.delete(`/api/blogs/${blogToDelete[0].id}`)
			.set('Authorization', anotherUserAuthHeader)
			.expect(401)

		const blogs = await blogsInDb()
		assert(blogs.length === 1)
	})
})

after(async () => {
	await clearDatabase()
	await closeDatabase()
})