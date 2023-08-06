const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return sortedBlogs[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}