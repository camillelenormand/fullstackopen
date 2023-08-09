const logger = require('./logger')

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
    return response.status(400).send({ error: 'malformatted id' })
  case 'ValidationError': {
    if (error.errors) {
      const validationErrors = Object.values(error.errors).map(err => err.message).join(', ')
      return response.status(400).json({ error: validationErrors })
    }
    return response.status(400).json({ error: error.message })
  }
  case 'JsonWebTokenError':
    return response.status(400).json({ error: error.message })
  case 'TokenExpiredError':
    return response.status(401).json({ error: 'token expired' })
  default:
    next(error)
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}