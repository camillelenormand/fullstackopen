import { useMutation, useQueryClient } from 'react-query'
import { useNotify } from '../contexts/NotificationContext'
import blogService from '../services/blogs'


const useLikeMutation = () => {
  const queryClient = useQueryClient()
  const queryKey = ['blogs']
  const notifyWith = useNotify()

  return useMutation({
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
}

export default useLikeMutation