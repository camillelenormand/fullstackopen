const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return sortedBlogs[0]
}

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



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}