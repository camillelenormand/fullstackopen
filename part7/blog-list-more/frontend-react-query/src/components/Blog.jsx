import BlogService from '../services/blogs'
import { useQuery } from 'react-query'
import { useMatch } from 'react-router-dom'
import useLikeMutation from '../hooks/useLikeMutation'
import useCreateMutation from '../hooks/useCreateMutation'
import Loading from './Loading'
import Error from './Error'
import Button from './Button'

const Blog = () => {
  console.log('Blog component')
  // Fetch all blogs
  const { isLoading, isError, error, data } = useQuery('blogs', BlogService.getAllBlogs)
  // Get the like mutation hook
  const likeMutation = useLikeMutation()

  const blogs = data?.blogs

  const match = useMatch('/blogs/:id')

  // Find the blog if a specific ID is matched in the route
  const blog = match ? blogs?.find(blog => blog.id === match.params.id) : null


  // Handle the like button click
  const handleLike = () => {
    const token = window.localStorage.getItem('loggedBlogToken')
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    likeMutation.mutate({
      id: blog.id,
      newBlog: updatedBlog,
      authToken: token
    })
  }

  // Handle loading and error states
  if (isLoading) return <Loading />
  if (isError) return <Error error={error.message} />

  // Conditionally render the single blog view or the blog list
  if (blog) {
    // Display details of a single blog
    return (
      <>
        <h1>Blog</h1>
        <Button onClick={() => handleCreate()}>New</Button>
        <h1>{blog.title}</h1>
        <p>Author: {blog.author}</p>
        <p>URL: <a href={blog.url}>{blog.url}</a></p>
        <p>Likes: {blog.likes}</p>
        <p>Added by {blog.user.name}</p>
        <button onClick={() => handleLike(blog.id)}>Like</button>
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
            <button onClick={handleLike} disabled={likeMutation.isLoading}>Like</button>
          </li>
        ))}
      </ul>
    )
  }
}

export default Blog
