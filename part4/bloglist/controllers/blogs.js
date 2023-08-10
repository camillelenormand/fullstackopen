const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { faker } = require('@faker-js/faker')
const jwt = require('jsonwebtoken')


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


// Get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs)

})

// Get a specific blog
blogsRouter.get('/:id', async (request, response) => {
  await Blog.findById(request.params.id).then(blog => {
    response.json(blog)
  })
})

// Create a blog
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token invalid'})
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201).json(savedBlog)
})
  
// Delete a blog
blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // Check if token is valid
  !request.token ? response.status(401).json({ error: 'token invalid'}) : decodedToken.id

  // Find user associated with token
  const user = await User.findById(decodedToken.id)

  // Find blog to delete
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === decodedToken.id.toString()) {
    
    // remove blog from blog collection
    await Blog.findByIdAndRemove(request.params.id)

    // remove blog reference from user's blog collection
    user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString())
    await user.save()
    response.status(204).end()
  }
  else {
    response.status(401).json({ error: 'unauthorized' })
  }
})

// Update a blog
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
