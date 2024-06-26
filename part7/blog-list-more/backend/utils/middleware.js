const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(400).json({ error: 'token missing or invalid' })
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({ error: 'token expired' })
	} else if (error.name === 'MongoError' && error.code === 11000) {
		return response.status(400).json({ error: 'username already exists' })
	} else if (error.name === 'SyntaxError') {
		return response.status(400).json({ error: 'malformatted request' })
	} 

	next(error)
}

const getTokenFrom = (request) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7)
	}
	return null
}

const tokenExtractor = (request, response, next) => {
	request.token = getTokenFrom(request)
	next()
}

const userExtractor = async (request, response, next) => {
	const token = getTokenFrom(request)

	if (token) {
		const decodedToken = jwt.verify(token, process.env.SECRET)
		if (!decodedToken.id) {
			return response.status(401).json({ error: 'token invalid' })
		} 

		request.user = await User.findById(decodedToken.id)
	}

	next()
}

module.exports = {
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor,
}
