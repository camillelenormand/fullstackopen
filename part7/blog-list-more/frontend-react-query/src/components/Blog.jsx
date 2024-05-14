import BlogService from '../services/blogs'
import { useQuery } from 'react-query'
import { useMatch } from 'react-router-dom'
import useLike from '../hooks/useLikeBlog'
import Loading from './Loading'
import Error from './Error'
import Comments from './Comments'
import CommentForm from './CommentForm'
import Button from './Button'
import { BlogTitle, BlogAuthor, BlogUrl } from './BlogListStyles'
import styled from 'styled-components'

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
`

const Blog = () => {
  // Fetch all blogs
  const { isLoading, isError, error, data } = useQuery('blogs', BlogService.getAllBlogs)
  // Get the like mutation hook
  const likeBlog = useLike()

  const blogs = data?.blogs

  const match = useMatch('/blogs/:id')

  // Find the blog if a specific ID is matched in the route
  const blog = match ? blogs?.find(blog => blog.id === match.params.id) : null


  // Handle the like button click
  const handleLike = () => {
    const token = window.localStorage.getItem('loggedBlogToken')
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    likeBlog.mutate({
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
        <BlogContainer>
          <BlogTitle>{blog.title}</BlogTitle>
          <BlogAuthor>Author: {blog.author}</BlogAuthor>
          <p>More details:</p><BlogUrl as="a" href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</BlogUrl>
          <p>Number of Likes: {blog.likes}</p>
          <p>Added by {blog.user.name}</p>
        </BlogContainer>
          <Button onClick={() => handleLike(blog.id)}>Like this article!</Button>
          <CommentForm blogId={blog.id} />
          <Comments comments={blog.comments} />
      </>
    )
  } else {
    return (
      <Error error="No blog found" />
    )
  }
}

export default Blog
