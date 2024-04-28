// db.js
const mongoose = require('mongoose')
const logger = require('./logger')

let isConnectedBefore = false

const connectDB = (uri) => {
	if (isConnectedBefore) {
		logger.warn('Attempted to connect to MongoDB again!')
		return
	}
	mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then(() => {
			isConnectedBefore = true
			logger.info('MongoDB connected.')
		})
		.catch(err => {
			logger.error('Error connecting to MongoDB:', err.message)
		})

	mongoose.connection.on('error', err => {
		logger.error('MongoDB connection error:', err.message)
	})

	mongoose.connection.on('disconnected', () => {
		isConnectedBefore = false
		logger.warn('MongoDB disconnected')
	})
}

module.exports = { connectDB }
