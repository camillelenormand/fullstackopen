// src/components/BlogList.jsx
// Import hooks
import { useState } from 'react'
// Import contexts and custom hooks 
import useBlogs from '../hooks/useBlogs'
import usePagination from '../hooks/usePagination'
import useLike from '../hooks/useLikeBlog'
import useDelete from '../hooks/useDeleteBlog'
// Import components
import NoBlogs from './NoBlogs'
import Loading from './Loading'
import Error from './Error'
import Pagination from './Pagination'
import BlogCard from './BlogCard'
// Import styled components
import { GridContainer } from './BlogListStyles'
// Import services
import storageService from '../services/storage'

const Blogs = () => {
  // Define state variables for pagination
  const { limit } = useState(10)

  // Custom hooks
  const { page, nextPage, prevPage } = usePagination()
  const { data, isLoading, isError, error } = useBlogs({ page, limit })
  const likeBlog = useLike()
  const deleteBlog = useDelete()

  // Handle loading and error states
  if (isLoading) 
    return <Loading />
  if (isError) 
    return <Error error={error.message} />


  // Define event handlers for liking and deleting blog posts
  const handleLike = (blog) => {
    const token = storageService.loadUser().token
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    likeBlog.mutate({
      id: updatedBlog.id,
      newBlog: updatedBlog,
      authToken: token,
    })
  }

  const handleDelete = (blog) => {
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
            isLikeLoading={likeBlog.isLoading}
            isDeleteLoading={deleteBlog.isLoading}
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
