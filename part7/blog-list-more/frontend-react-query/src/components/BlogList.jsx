import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useState } from 'react'
import blogService from '../services/blogs'
import { BlogCard, BlogTitle, BlogAuthor, GridContainer, BlogUrl } from './BlogListStyles'
import Button from './Button'
import { useNotify } from '../contexts/NotificationContext'

const Blogs = () => {
  // Define state variables for pagination
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  // Get the queryClient from the useQueryClient hook
  const queryClient = useQueryClient()

  // Fetch all blogs
  const query = useQuery(
    [
      'blogs',
      page,
      limit
    ],
    () => blogService.getAllBlogs({ page, limit }),
    {
      keepPreviousData: true, // This will keep showing the previous page's data while loading the next page's data
    }
  )
  console.log('query:', query)

  // Destructure the query object to get the isLoading, isError, and error properties
  const { isLoading, isError, error } = query

  // Use the notify function from the NotificationContext
  const notifyWith = useNotify()

  // Define a mutation to like a blog post
  const likeMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onMutate: async (updatedBlog) => {
      await queryClient.cancelQueries(['blogs'])
      const previousBlogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], old => query.data.blogs?.map(
        blog => blog.id === updatedBlog.id
          ? { ...blog, likes: blog.likes + 1 }
          : blog
      ))
      return { previousBlogs }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notifyWith('Blog liked successfully')
      console.log('Mutation successful with data:', data)
    },
    onError: (error, updatedBlog, context) => {
      queryClient.setQueryData(['blogs'], context.previousBlogs)
      notifyWith(error)
      console.error('Failed to like blog: ', error)
    }
  }
  )

  // Define a mutation to delete a blog post
  const deleteMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onMutate: async (deletedBlog) => {
      queryClient.setQueryData(['blogs'], oldData => {
        // Ensure oldData and oldData.blogs exist before trying to filter
        if (oldData && oldData.blogs) {
          return {
            ...oldData, // Preserve other properties in the oldData object
            blogs: oldData.blogs.filter(blog => blog.id !== deletedBlog.id) // Update only the blogs array
          };
        }
        return oldData; // In case oldData is not structured as expected, return it unmodified
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notifyWith('Blog deleted successfully')
      console.log('Mutation successful with data:', data)
    },
    onError: (error, deletedBlog, context) => {
      queryClient.setQueryData(['blogs'], context.previousBlogs)
      notifyWith(error)
      console.error('Failed to delete blog: ', error)
    }
  })

  // Implement UI controls to navigate pages
  const handleNextPage = () => setPage(oldPage => oldPage + 1);
  const handlePrevPage = () => setPage(oldPage => Math.max(oldPage - 1, 1));

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>


  // Define event handlers for liking and deleting blog posts
  const handleLike = (blog) => {
    const token = JSON.parse(window.localStorage.getItem('loggedBlogToken'))
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    likeMutation.mutate({
      id: likedBlog.id,
      newBlog: likedBlog,
      authToken: token,
    })
  }

  const handleDelete = (blog) => {
    const token = JSON.parse(window.localStorage.getItem('loggedBlogToken'))
    deleteMutation.mutate({
      id: blog.id,
      authToken: token,
    })
  }

  // Display a message if there are no blogs to display
  if (!query.isLoading && query.data.blogs?.length === 0) return <div>No blogs to display.</div>

  return (
    <>
      <GridContainer>
        {query.data.blogs?.map(blog => (
          <BlogCard key={blog.id}>
            <BlogTitle>{blog.title}</BlogTitle>
            <BlogAuthor>{blog.author}</BlogAuthor>
            <BlogUrl
              as="a"
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer">
              {blog.url}
            </BlogUrl>
            <Button
              id="like"
              onClick={() => handleLike(blog)}
              disabled={likeMutation.isLoading}>
              {blog.likes} Likes
            </Button>
            <Button
              id="delete"
              onClick={() => handleDelete(blog)}
              disabled={deleteMutation.isLoading}>
              Delete
            </Button>
          </BlogCard>
        ))}
      </GridContainer>
      <Button onClick={handlePrevPage} disabled={page === 1}>Previous</Button>
      <Button onClick={handleNextPage} disabled={!query.data?.next}>Next</Button>
    </>
  )
}

export default Blogs
