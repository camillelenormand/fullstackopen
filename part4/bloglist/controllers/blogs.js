const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const generateBlog = require('../data/blog_seed')

// Generate new blogs

blogsRouter.post('/generate', async (request, response) => {
  try {
    const blogs = await Blog.insertMany(generateBlog)
    response.json(blogs)
    response.status(201).end()
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
  })

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog.save()
    .then(savedBlog => {
      response.json(savedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
