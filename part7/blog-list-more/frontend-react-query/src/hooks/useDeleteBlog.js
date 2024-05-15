import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { useNotify } from '../contexts/NotificationContext'
import { Navigate } from 'react-router-dom'

const useDelete = () => {
  const queryKey = ['blogs']
  const queryClient = useQueryClient()
  const notify = useNotify()

  return useMutation({
    mutationFn: blogService.deleteBlog,
    onMutate: async (deletedBlog) => {
      await queryClient.cancelQueries(queryKey)

      const previousBlogs = queryClient.getQueryData(queryKey)

      if (previousBlogs) {
        queryClient.setQueryData(queryKey, {
          ...previousBlogs,
          blogs: previousBlogs.blogs.filter(blog => blog.id !== deletedBlog.id)
        })
      }

      return { previousBlogs }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey)
      notify('Blog deleted successfully', 'success')
      Navigate('/')
    },
    onError: (error, deletedBlog, context) => {
      if (context?.previousBlogs) {
        queryClient.setQueryData(queryKey, context.previousBlogs)
      }
      notify(`Failed to delete the blog: ${error.message}`, 'error')
    }
  })
}


export default useDelete