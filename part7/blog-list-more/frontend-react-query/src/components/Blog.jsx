import BlogService from '../services/blogs'
import { useQuery } from 'react-query'
import { useMatch } from 'react-router-dom'

const Blog = () => {
  console.log('Blog component')
  const { isLoading, isError, error, data } = useQuery('blogs', BlogService.getAllBlogs)

  const blogs = data?.blogs

  const match = useMatch('/blogs/:id')

  // Find the blog if a specific ID is matched in the route
  const blog = match ? blogs?.find(blog => blog.id === match.params.id) : null

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  // Conditionally render the single blog view or the blog list
  if (blog) {
    // Display details of a single blog
    return (
      <>
        <h1>{blog.title}</h1>
        <p>Author: {blog.author}</p>
        <p>URL: <a href={blog.url}>{blog.url}</a></p>
        <p>Likes: {blog.likes}</p>
        <p>Added by {blog.user.name}</p>
      </>
    )
  } else {
    // Display a list of all blogs
    return (
      <ul>
        {blogs?.map(blog => (
          <li key={blog.id}>
            <div>Title: {blog.title}</div>
            <div>Author: {blog.author}</div>
            <div>URL: {blog.url}</div>
            <div>Likes: {blog.likes}</div>
            <div>Added by {blog.user.name}</div>
          </li>
        ))}
      </ul>
    )
  }
}

export default Blog
