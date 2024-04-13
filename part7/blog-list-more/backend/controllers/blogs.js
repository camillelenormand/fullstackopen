// controllers/blogs.js
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

const { userExtractor } = require('../utils/middleware')

////////////////////////////////////////////////////////////////////

// Get a single blog
blogsRouter.get('/:id', async (request, response) => {
	console.log(' Get a single blog')
	const blog = await Blog.findById(request.params.id)
		.populate({
			path: 'comments'
		})
		
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

// Get blogs
blogsRouter.get('/', async (request, response) => {
	console.log(' Get blogs')
	// Default values for pagination
	const page = request.query.page || 1
	const limit = request.query.limit || 10

	const startIndex = (page - 1) * limit
	const endIndex = page * limit

	const results = {}

	try {
		results.totalCount = await Blog.countDocuments({}).exec()

		results.blogs = await Blog.find({})
			.populate('comments')
			.populate('user', {
				username: 1,
				name: 1,
				id: 1,
			})
			.sort({ createdAt: -1 })
			.limit(limit)
			.skip(startIndex)
			.exec()


		console.log('results.blogs', results.blogs)

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
	console.log(' Create a blog')
	// Get the title, author, url, likes, and commentId from the request
	const { title, author, url, likes, commentId } = request.body
	// Get the user from the request
	const user = request.user
	console.log('user', user)

	// Find the comments by the commentId
	const comment = await Comment.findById(commentId)
	console.log('comment', comment)

	// If the user is not found, return an error
	if (!user) {
		response.status(401).json({ error: 'unauthorized user' })
		console.log('unauthorized user', user)
	}

	// Create a new blog
	const blog = new Blog({
		title,
		author,
		url,
		likes: likes ? likes : 0,
		user: user.id,
	})

	// If the title or url is missing, return an error
	if (!blog.title || !blog.url) {
		response.status(400).json({ error: 'title or url missing' })
	}

	// Save the blog in the database
	const savedBlog = await blog.save()
	console.log('savedBlog', savedBlog)

	// Add the author to the blog
	user.blogs = user.blogs.concat(savedBlog._id)
	console.log('user.blogs', user.blogs)
	await user.save()

	// Add the comments to the blogs
	comment.blogs = comment.blogs.concat(savedBlog._id)
	await comment.save()

	response.status(201).json(savedBlog)
})

////////////////////////////////////////////////////////////////////

// Delete a blog
blogsRouter.delete('/:id', userExtractor, async (request, response) => {
	console.log(' Deleting a blog')
	const user = request.user
	console.log('user', user)

	if (!user) {
		response.status(401).json({ error: 'unauthorized user' })
		console.log('unauthorized user', user)
	}

	const blogToDelete = await Blog.findById(request.params.id)
	console.log('blogToDelete', blogToDelete)

	if (blogToDelete.user.toString() === request.user.id) {
		console.log('blogToDelete.user', blogToDelete.user)
		console.log('request.params.id', request.params.id)
		await Blog.findByIdAndDelete(request.params.id)
		response.status(204).end()
	} else {
		return response
			.status(401)
			.json({ error: 'Unauthorized to delete the blog' })
	}
})

////////////////////////////////////////////////////////////////////

// Update a blog
blogsRouter.put('/:id', async (request, response) => {
	console.log(' Updating a blog')
	const { title, author, url, likes} = request.body

	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		{ title, author, url, likes },
		{ new: true },
	)

	console.log('updatedBlog', updatedBlog)

	response.status(200).json({ message: 'Blog updated', updatedBlog }) ??
		response.status(404).json({ error: 'Blog not found or invalid' })
})

////////////////////////////////////////////////////////////////////


module.exports = blogsRouter
