import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { useNotify } from '../contexts/NotificationContext'

function useLikeBlog() {
  const queryClient = useQueryClient()
  const notifyWith = useNotify()

  return useMutation(blogService.updateBlog, {
    onMutate: async (updatedBlog) => {
      await queryClient.cancelQueries('blogs')
      const previousBlogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', (oldData) => {
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
      queryClient.invalidateQueries('blogs')
      notifyWith('Blog liked successfully')
      console.log('Mutation successful with data:', data)
    },
    onError: (error, updatedBlog, context) => {
      queryClient.setQueryData('blogs', context.previousBlogs)
      notifyWith(error)
      console.error('Failed to like blog: ', error)
    },
  })
}

export default useLikeBlog