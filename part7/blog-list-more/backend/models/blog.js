const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: false,
	},
	url: {
		type: String,
		required: true,
	},
	likes: {
		type: Number,
		default: 0,
		required: false,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		required: true,
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
		required: false,
	}],
})

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
