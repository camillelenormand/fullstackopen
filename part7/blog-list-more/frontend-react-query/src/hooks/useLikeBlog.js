import { useMutation, useQueryClient } from 'react-query'
import { useNotify } from '../contexts/NotificationContext'
import blogService from '../services/blogs' 
import storageService from '../services/storage'

const useLike = () => {
  const queryClient = useQueryClient()
  const queryKey = ['blogs']
  const notifyWith = useNotify()

  return useMutation({
    mutationFn: blogService.updateBlog,
    onMutate: async (updatedBlog) => {
      await queryClient.cancelQueries(queryKey)

      const previousBlogs = queryClient.getQueryData(queryKey)
      
      if (previousBlogs) {
        queryClient.setQueryData(queryKey, {
          ...previousBlogs,
          blogs: previousBlogs.blogs.map(blog =>
            blog.id === updatedBlog.id ? { ...blog, likes: blog.likes + 1 } : blog
          ),
        })
      }

      return { previousBlogs }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKey)
      notifyWith('Blog liked successfully', 'success')
    },
    onError: (error, updatedBlog, context) => {
      if (context?.previousBlogs) {
        queryClient.setQueryData(queryKey, context.previousBlogs)
      }      
      notifyWith(`Failed to like the blog: ${error.message}`, 'error')
    }
  })
}

export default useLike