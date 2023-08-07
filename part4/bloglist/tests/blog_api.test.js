const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper.test')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async() => {
  await Blog.deleteMany({})
  console.log('cleared')
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
    console.log('blogs saved')
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('return all blogs', async () => {
  const response = await api.get('/api/blogs')
  console.log('fetching response')
  console.log('response length: ', response.body.length)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('One of the title of the blogs must be "TDD harms architecture"', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)
  expect(titles).toContainEqual('TDD harms architecture')
})

test('unique identifier property of the blog posts is named "id"', async () => {
  const response = await api.get('/api/blogs')

  const ids = response.body.map(r => r.id)

  expect(ids).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Responsive Web Design',
    author: 'Ethan Marcotte',
    url: 'https://alistapart.com/article/responsive-web-design/',
    likes: 10
  }

  await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  console.log('blogsAtEnd: ', blogsAtEnd)
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(r => r.title)
  console.log('titles: ', titles)
  expect(titles).toContainEqual('Responsive Web Design')
})

test('blog without a title is not added', async () => {
  const newBlog = {
    author: 'Ethan Marcotte',
    url: 'https://alistapart.com/article/responsive-web-design/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
  expect(response.body).not.toContainEqual(newBlog)
})
  
test('blog without an URL is not added', async () => {
  const newBlog = {
    title: 'Responsive Web Design',
    author: 'Ethan Marcotte',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
  expect(response.body).not.toContainEqual(newBlog)
})

test('blog without any likes will have a 0 default value', async () => {
  const newBlog = {
    title: 'Responsive Web Design',
    author: 'Ethan Marcotte',
    url: 'https://alistapart.com/article/responsive-web-design/'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const likes = response.body.map(r => r.likes).slice(-1)

  console.log(likes)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(likes).toEqual([0])
})

test('blog without an author is added', async () => {
  const newBlog = {
    title: 'Responsive Web Design',
    url: 'https://alistapart.com/article/responsive-web-design/',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
})

afterAll(async () => {
  await mongoose.connection.close()
}, 100000)
