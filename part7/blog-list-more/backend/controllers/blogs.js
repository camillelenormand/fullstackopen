const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const { userExtractor } = require('../utils/middleware')

////////////////////////////////////////////////////////////////////

// Get blogs
blogsRouter.get('/', async (request, response) => {
	// Default values for pagination
	const page = request.query.page || 1
	const limit = request.query.limit || 10

	const startIndex = (page - 1) * limit
	const endIndex = page * limit

	const results = {}
	try {
		results.totalCount = await Blog.countDocuments({}).exec()

		results.blogs = await Blog.find({})
			.populate('user', { username: 1, name: 1 })
			.limit(limit)
			.skip(startIndex)
			.exec()

		// Calculate total pages
		results.totalPages = Math.ceil(results.totalCount / limit)

		// Calculate next and previous pages
		if (startIndex > 0) {
			results.previous = {
				page: page - 1,
				limit: limit,
			}
		}
		if (endIndex < results.totalCount) {
			results.next = {
				page: page + 1,
				limit: limit,
			}
		}
		response.status(200).json(results)
	} catch (error) {
		response.status(500).json({ message: error.message })
	}
})

////////////////////////////////////////////////////////////////////

// Create a blog
blogsRouter.post('/', userExtractor, async (request, response) => {
	const { title, author, url, likes } = request.body
	console.log({ title, author, url, likes })

	const blog = new Blog({
		title,
		author,
		url,
		likes: likes ? likes : 0,
	})

	console.log('blog', blog)

	const user = request.user

	console.log('user', user)

	if (!user) {
		response.status(401).json({ error: 'unauthorized user' })
		console.log('unauthorized user', user)
	}

	blog.user = user._id

	console.log('blog.user', blog.user)

	const savedBlog = await blog.save()
	console.log('savedBlog', savedBlog)

	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

////////////////////////////////////////////////////////////////////

// Delete a blog
blogsRouter.delete('/:id', userExtractor, async (request, response) => {
	const blogToDelete = await Blog.findById(request.params.id)
	console.log('blogToDelete', blogToDelete)

	if (!blogToDelete) {
		return response.status(404).json({ error: 'Blog not found' });
	}

	const user = request.user
	console.log('---- user ----', user)

	if (!user || blogToDelete.user.toString() !== user.id.toString()) {
		response.status(401).json({ error: 'Unauthorized' })
	}

	user.blogs = user.blogs.filter(
		(blog) => blog.toString() !== blogToDelete._id.toString(),
	)

	await user.save()

	await Blog.deleteOne({ _id: request.params.id })

	response.status(204).end()
})

////////////////////////////////////////////////////////////////////

// Update a blog
blogsRouter.put('/:id', async (request, response) => {
	const { title, author, url, likes } = request.body

	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		{ title, author, url, likes },
		{ new: true },
	)

	console.log('updatedBlog', updatedBlog)

	response.status(200).json({ message: 'Blog updated', updatedBlog }) ??
		response.status(404).json({ error: 'Blog not found or invalid' })
})

module.exports = blogsRouter
