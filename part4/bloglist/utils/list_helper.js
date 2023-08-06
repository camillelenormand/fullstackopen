const dummy = blogs => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  return sortedBlogs[0]
}

// initialiser une valeur 0 pour calculer le total d'articles par auteur
// Boucler sur les articles en incrementant le nom des auteurs à chaque tour de boucle

const mostBlogs = (blogs) => {
  const authorBlogsCount = blogs.reduce((count, blog) => {
    const author = blog.author
    count[author] = (count[author] || 0) + 1
    return count
  }, {})

  console.log(authorBlogsCount)

  let nameHighestAuthor = ''
  let highestBlogCount = 0

  for (const author in authorBlogsCount) {
    if (authorBlogsCount[author] > highestBlogCount) {
      nameHighestAuthor = author
      highestBlogCount = authorBlogsCount[author]
    }
  }
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