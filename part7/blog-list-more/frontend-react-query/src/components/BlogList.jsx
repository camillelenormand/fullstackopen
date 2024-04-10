import { useState } from 'react'
import { GridContainer } from './BlogListStyles'
// import Button from './Button'
import { useAuth } from '../contexts/AuthContext'
// import { Link } from 'react-router-dom'
// import Blog from './Blog'
import { useBlogs } from '../hooks/useBlogs'
import NoBlogs from './NoBlogs'
import Loading from './Loading'
import Error from './Error'
import Pagination from './Pagination'
import { usePagination } from '../hooks/usePagination'
import useLikeMutation from '../hooks/useLikeMutation'
import useDeleteMutation from '../hooks/useDeleteMutation'
import BlogCard from './BlogCard'

const Blogs = () => {
  // Define state variables for pagination
  const { limit } = useState(10)

  // Custom hooks
  const user = useAuth()
  const { page, nextPage, prevPage } = usePagination()
  const { data, isLoading, isError, error } = useBlogs({ page, limit })
  const likeMutation = useLikeMutation()
  const deleteMutation = useDeleteMutation()

  console.log('user:', user)


  // Handle loading and error states
  if (isLoading) return <Loading />
  if (isError) return <Error error={error.message} />


  // Define event handlers for liking and deleting blog posts
  const handleLike = (blog) => {
    const token = JSON.parse(window.localStorage.getItem('loggedBlogToken'))
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    likeMutation.mutate({
      id: updatedBlog.id,
      newBlog: updatedBlog,
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
          <BlogCard
            key={blog.id}
            blog={blog}
            onDelete={(blog) => {
              if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
                handleDelete(blog)
              }
            }}
            onLike={handleLike}
            isLikeLoading={likeMutation.isLoading}
            isDeleteLoading={deleteMutation.isLoading}
          />
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
