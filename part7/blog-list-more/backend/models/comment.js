// models/comment.js
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog',
		},
	],
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment