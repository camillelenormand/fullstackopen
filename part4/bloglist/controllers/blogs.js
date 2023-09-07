const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
const { faker } = require('@faker-js/faker')

////////////////////////////////////////////////////////////////////

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

////////////////////////////////////////////////////////////////////

// Get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs)

})

////////////////////////////////////////////////////////////////////

// Get 1 blog
blogsRouter.get('/:id', async (request, response) => {
  await Blog.findById(request.params.id).then(blog => {
    response.json(blog)
  })
})

////////////////////////////////////////////////////////////////////

// Create a blog
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)


  console.log('---- body ----', body)
  console.log('---- user ----', user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  console.log('blog', blog)

  const savedBlog = await blog.save()
  console.log('savedBlog', savedBlog)

  user.savedBlogs = user.blogs.concat(savedBlog._id)
  await user.save()
    
  response.status(201).json(savedBlog)
})

////////////////////////////////////////////////////////////////////
  
// Delete a blog
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  console.log('---- user ----', user)

  if (!user) {
    response.status(401).json({ error: 'Token invalid or missing' })
  }

  const blog = await Blog.findById(request.params.id) ?? response.status(404).json({ error: 'Blog not found' })
  console.log('blog found', blog)
  
  blog.user.toString() === user._id.toString() 
    ? await Blog.findByIdAndRemove(request.params.id) && response.status(200).json({ message: 'Blog deleted' })
    : response.status(401).json({ error: 'Unauthorized' })
})

////////////////////////////////////////////////////////////////////

// Update a blog
blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json({ message: 'Blog updated'}) ?? response.status(404).json({ error: 'Blog not found or invalid' })
})


module.exports = blogsRouter
