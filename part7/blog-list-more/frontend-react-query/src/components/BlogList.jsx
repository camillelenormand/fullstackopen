import { useMutation, useQueryClient } from 'react-query'
import { useState } from 'react'
import blogService from '../services/blogs'
import { BlogCard, BlogTitle, BlogAuthor, GridContainer, BlogUrl } from './BlogListStyles'
import Button from './Button'
import { useNotify } from '../contexts/NotificationContext'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import Blog from './Blog'
import { useBlogs } from '../hooks/useBlogs'
import NoBlogs from './NoBlogs'
import Loading from './Loading'
import Error from './Error'
import Pagination from './Pagination'
import { usePagination } from '../hooks/usePagination'

const Blogs = () => {
  // Define state variables for pagination
  const { limit } = useState(10)

  // Custom hooks
  const queryClient = useQueryClient()
  const user = useAuth()
  const notifyWith = useNotify()
  const { page, nextPage, prevPage } = usePagination()
  const { data, isLoading, isError, error } = useBlogs({ page, limit })

  console.log('user:', user)

  // Define a mutation to like a blog post
  const likeMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onMutate: async (updatedBlog) => {
      await queryClient.cancelQueries(queryKey)
      const previousBlogs = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (oldData) => {
        return {
          ...oldData,
          blogs: oldData?.blogs?.map(blog =>
            blog.id === updatedBlog.id ? { ...blog, likes: blog.likes + 1 } : blog
          ),
        }
      })

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
  })

  // Define a mutation to delete a blog post
  const deleteMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onMutate: async (deletedBlog) => {
      queryClient.setQueryData(['blogs'], oldData => {
        if (oldData && oldData.blogs) {
          return {
            ...oldData,
            blogs: oldData.blogs.filter(blog => blog.id !== deletedBlog.id)
          }
        }
        return oldData
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

  // Handle loading and error states
  if (isLoading) return <Loading />
  if (isError) return <Error error={error.message} />


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
  if (!isLoading && data.blogs?.length === 0) return <NoBlogs />

  return (
    <>
      <GridContainer>
        {data?.blogs?.map(blog => (
          <BlogCard key={blog.id}>
            <BlogTitle>
              <Link
                to={`/blogs/${blog.id}`}
                element={<Blog />}>{blog.title}
              </Link>
            </BlogTitle>
            <BlogAuthor>{blog.author}</BlogAuthor>
            <BlogUrl
              as="a"
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer">
              {blog.url}
            </BlogUrl>
            {user.username !== null ? (
              <div>
                <Button
                  id="like"
                  onClick={() => handleLike(blog)}
                  disabled={likeMutation.isLoading}>
                  {blog.likes} Likes
                </Button><Button
                  id="delete"
                  onClick={() => handleDelete(blog)}
                  disabled={deleteMutation.isLoading}>
                  Delete
                </Button>
              </div>
            ) : null}
          </BlogCard>
        ))}
      </GridContainer>
      <Pagination
        page={page}
        hasNextPage={!!data?.next}
        onPrevious={prevPage}
        onNext={nextPage}
      />
    </>
  )
}

export default Blogs
