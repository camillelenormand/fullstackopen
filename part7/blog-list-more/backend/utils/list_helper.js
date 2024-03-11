const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => {
	const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
	return sortedBlogs[0]
}

// Find author with most blogs using vanilla js
const mostBlogs = (blogs) => {
	const authorBlogsCount = blogs.reduce((count, blog) => {
		// Select only authors in Object
		const author = blog.author
		console.log(author)
		// Counting numbers of blogs by author
		count[author] = (count[author] || 0) + 1
		console.log(count)
		return count
	}, {})

	console.log(authorBlogsCount)

	// Init variables to store author with highest amount of blogs and blog count
	let nameHighestAuthor = ''
	let highestBlogCount = 0

	// Compare each author by number of blogs and assign values to variables
	for (const author in authorBlogsCount) {
		if (authorBlogsCount[author] > highestBlogCount) {
			nameHighestAuthor = author
			console.log(nameHighestAuthor)
			highestBlogCount = authorBlogsCount[author]
			console.log(highestBlogCount)
		}
	}

	console.log(nameHighestAuthor, highestBlogCount)

	return {
		author: nameHighestAuthor,
		blogs: highestBlogCount,
	}
}

// Find author with most likes using lodash
const mostLikes = (blogs) => {
	// Group object by author
	const authorLikes = _.groupBy(blogs, 'author')
	console.log(authorLikes)

	// Map authors and corresponding number of likes by blogs
	const authorTotalLikes = _.mapValues(authorLikes, (blogs) => {
		return _.sumBy(blogs, 'likes')
	})
	console.log('number of likes by author: ', authorTotalLikes)

	// Sort authors by number of likes asc
	const sortedAuthors = _.keys(authorTotalLikes).sort((a, b) => {
		return authorTotalLikes[b] - authorTotalLikes[a]
	})
	console.log(sortedAuthors)

	// Get the most liked author
	const authorWithMostLikes = sortedAuthors[0]
	console.log(authorWithMostLikes)
	// Get number of likes for this author
	const likes = authorTotalLikes[authorWithMostLikes]
	console.log(likes)

	return {
		author: authorWithMostLikes,
		likes: likes,
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
}
