const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

// Router
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const commentsRouter = require('./controllers/comments')

const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

// Routes
console.log('blogsRouter is', typeof blogsRouter)
app.use('/api/blogs', blogsRouter)
console.log('blogsRouter is', typeof usersRouter)
app.use('/api/users', usersRouter)
console.log('blogsRouter is', typeof loginRouter)
app.use('/api/login', loginRouter)
console.log('blogsRouter is', typeof commentsRouter)
console.log('commentsRouter is', commentsRouter)
app.use('/api/blogs', commentsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing')
	app.use('/api/testing', testingRouter)
}

module.exports = app
