const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  switch (error.name) {
  case 'CastError':
    response.status(400).send({ error: 'malformatted id' })
    break
  case 'ValidationError':
    if (error.errors) {
      const validationErrors = Object.values(error.errors).map(err => err.message).join(', ')
      response.status(400).json({ error: validationErrors })
    } else {
      response.status(400).json({ error: error.message })
    }
    break
  case 'JsonWebTokenError':
    response.status(400).json({ error: error.message })
    break
  case 'TokenExpiredError':
    response.status(401).json({ error: 'token expired' })
    break
  case 'UnauthorizedError':
    response.status(401).json({ error: 'unauthorized' })
    break
  default:
    next(error)
  }
}

const tokenExtractor = async (request, response, next) => {
  const authorizationHeader = request.get('authorization')
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    request.token = authorizationHeader.split(' ')[1]
  }
  next()
}

const userExtractor = async (request, response, next) => {
  try {
    const token = request.token
    const secret = process.env.SECRET
    
    const decodedToken = jwt.verify(token, secret)
    const userId = decodedToken.id
    
    if (!token || !userId) {
      return response.status(401).json({ error: 'token invalid' })
    }
    
    request.user = userId
    next()
  } catch (error) {
    return response.status(500).json({ error: 'internal server error' })
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}