const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { faker } = require('@faker-js/faker')

// Seed new blogs
blogsRouter.post('/seed', async (request, response) => {
  const numberOfBlogs = 10

  const fakeBlogs = Array.from({ length: numberOfBlogs }, () => ({
    title: faker.lorem.sentence(),
    author: faker.person.fullName(),
    url: faker.internet.url(),
    likes: faker.number.int(100)
  }))

  Blog.insertMany(fakeBlogs)
    .then(createdBlogs => {
      console.log('Fake blogs seeded successfully:', createdBlogs)
      response.status(201).json({ message: 'Fake blogs seeded successfully' })
    })
    .catch(error => {
      console.log(error)
      response.status(500).json({ error: error.message })
    })
})

// Get all blogs
blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

// Create a blog
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
