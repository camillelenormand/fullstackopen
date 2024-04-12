// controllers/comments.js
const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

/////////////////////////////////////////////////////////////////

// Get comments

commentsRouter.get('/:id/comments', async (request, response) => {
	const comments = await Comment.find({})
	response.json(comments)
})

// Create a comment

commentsRouter.post('/:id/comments', async (request, response) => {
	// Get the body of the request
	const body = request.body

	// Find the blog related to this comment
	const blog = await Blog.findById(request.params.id)

	console.log('blog found related to this comment', blog)

	// Get the content of the comment
	const content = body.content

	// Create a new comment
	const newComment = new Comment({
		content: content,
		blogs: blog._id,
	})

	// If the content is missing, return an error
	if (!newComment.content) {
		return response.status(400).json({ error: 'content missing for this blog' })
	}

	// If the blog is missing, return an error
	if (!newComment.blogId) {
		return response.status(400).json({ error: 'blog linked to the comment is missing' })
	}

	// Save the comment in the database
	const savedComment = await newComment.save()
	console.log('savedComment', savedComment)
	response.status(201).json(savedComment)
})
