import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blog, updateBlog, deleteBlog }) => {
  console.log(blog)

  const sortedBlog = blog.sort((a, b) => {
    return b.likes - a.likes
  })

  return (
    <main>
      {sortedBlog?.map((blog) => (
        <Blog 
          key={blog.id} 
          blog={blog} 
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </main>
  )
}

BlogList.propTypes = {
  blog: PropTypes.array.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default BlogList
