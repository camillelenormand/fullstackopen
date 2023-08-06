const _ = require('lodash')

const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return sortedBlogs[0]
}

// Find author with most blogs using vanilla js
const mostBlogs = (blogs) => {

  const authorBlogsCount = blogs.reduce((count, blog) => {
    const author = blog.author
    console.log(author)
    count[author] = (count[author] || 0) + 1
    console.log(count)
    return count
  }, {})

  console.log(authorBlogsCount)

  let nameHighestAuthor = ''
  let highestBlogCount = 0

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
    'author': nameHighestAuthor, 
    'blogs': highestBlogCount
  }
}

// Find author with most likes using lodash
const mostLikes = (blogs) => {
  const authorLikes = _.groupBy(blogs, 'author')
  console.log(authorLikes)

  const authorTotalLikes = _.mapValues(authorLikes, (blogs) => {
    return _.sumBy(blogs, 'likes')
  })
  console.log('number of likes by author: ', authorTotalLikes)

  const sortedAuthors = _.keys(authorTotalLikes).sort((a, b) => {
    return authorTotalLikes[b] - authorTotalLikes[a]
  })
  console.log(sortedAuthors)

  const authorWithMostLikes = sortedAuthors[0]
  console.log(authorWithMostLikes)
  const likes = authorTotalLikes[authorWithMostLikes]
  console.log(likes)
  
  return {
    'author': authorWithMostLikes,
    'likes': likes
  }
}






// const authorTotalLikes = _.mapValues(author)


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}