// models/comment.js
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
	blog: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Blog',
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now,
		required: true,
	}
})

commentSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment