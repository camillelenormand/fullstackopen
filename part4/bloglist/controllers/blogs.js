const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
const { faker } = require('@faker-js/faker')

////////////////////////////////////////////////////////////////////

// Seed new blogs
blogsRouter.post('/seed', async (request, response) => {
  const numberOfBlogs = 10

  const fakeBlogs = Array.from({ length: numberOfBlogs }, () => ({
    title: faker.lorem.sentence(),
    author: faker.person.fullName(),
    url: faker.internet.url(),
    likes: faker.number.int(100)
  }))

  const newBlogs = await Blog.insertMany(fakeBlogs)
  console.log('Fake blogs seeded successfully:', newBlogs)
  response.status(201).json({ message: 'Fake blogs seeded successfully' })
})

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
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

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
  const populateBlog = await savedBlog.populate('user', { username: 1, name: 1, id: 1 })
  
  response.status(201).json(populateBlog)
})

////////////////////////////////////////////////////////////////////
  
// Delete a blog
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  console.log('user', user)
  const blog = await Blog.findById(request.params.id)
  console.log('blog found', blog)

  !blog 
    ? response.status(404).json({ error: 'Blog not found' }) 
    : (blog.user.toString() !== user._id.toString()) ? response.status(401).json({ error: 'Unauthorized user' }) : await Blog.findByIdAndRemove(request.params.id) 

  console.log('blog deleted')

  response.status(204).end()

})

////////////////////////////////////////////////////////////////////

// Update a blog
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
