const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const { connectDB } = require('./utils/db') 

// Router
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const commentsRouter = require('./controllers/comments')
const middleware = require('./utils/middleware')

// Environment check for the database connection
if (process.env.NODE_ENV !== 'test') {
	connectDB(config.MONGODB_URI)
	console.log('Connected to MongoDB')
} else {
	// Use in-memory DB for tests
	const mongoInMemory = require('./utils/mongoTestUtils')
	mongoInMemory.connect()
	console.log('Connected to in-memory MongoDB')
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

// Routes
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', commentsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app
