// controllers/comments.js
const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

// Get comments
commentsRouter.get('/:id/comments', async (request, response) => {
	try {
		const comments = await Comment.find({ blog: request.params.id })
		response.json(comments)
	} catch (error) {
		response.status(500).json({ error: 'Something went wrong' })
	}
})

// Create a comment
commentsRouter.post('/:id/comments', async (request, response) => {
	try {
		const { content } = request.body
		const blog = await Blog.findById(request.params.id)

		if (!content) {
			return response.status(400).json({ error: 'content missing for this blog' })
		}

		if (!blog) {
			return response.status(400).json({ error: 'blog linked to the comment is missing' })
		}

		const newComment = new Comment({
			content,
			blog: blog._id,
		})

		const savedComment = await newComment.save()

		blog.comments.push(savedComment._id)
		await blog.save()

		response.status(201).json(savedComment)
	} catch (error) {
		response.status(500).json({ error: 'Something went wrong' })
	}
})

module.exports = commentsRouter