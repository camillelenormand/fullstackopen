const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { faker } = require('@faker-js/faker')
const { userExtractor } = require('../utils/middleware')

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
blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  
  console.log('User', user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user
  })

  const savedBlog = await blog.save()
  console.log('Saved blog:', savedBlog)
  console.log(savedBlog._id.toString())
  console.log(user.blogs)

  if (!user.blogs) {
    user.blogs = []
  } else {
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  }
  
  response.status(201).json(savedBlog)
})
  
// Delete a blog
blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  console.log('user', user)

  try {
    const blog = await Blog.findById(request.params.id)
    console.log('blog found', blog)

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    if (!blog.user || blog.user.toString() !== user.toString()) {
      return response.status(401).json({ error: 'Unauthorized' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    console.log('Blog deleted')

    console.log(user.blogs)

    user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString())
    await user.save()

    response.status(204).end()
  } catch (error) {
    console.error('Error deleting blog:', error)
    response.status(500).json({ error: 'Internal server error' })
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
