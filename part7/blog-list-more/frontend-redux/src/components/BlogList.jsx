import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../store/blogReducer'
import { useEffect } from 'react'

const Blog = ({ blog }) => {
  const { author, url, title } = blog

  return (
    <div className="blog"> {/* Add a class name for styling */}
      <h3>{title}</h3>
      <p><i>- {author}</i></p>
        {url}
    </div>
  )
}

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  console.log('blogs', blogs)
  const isLoading = useSelector(state => state.blogs.isLoading)
  console.log('isLoading', isLoading)

  useEffect(() => {
    dispatch(initializeBlogs(blogs))
    console.log(blogs)
  }, [dispatch])

  return (
    <div>
      {isLoading ? (
        <div>Loading blogs...</div>
      ) : (
        blogs.length > 0 ? (
          blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))
        ) : (
          <div>No blogs found.</div>
        )
      )}
    </div>
  )
}

export default BlogList
