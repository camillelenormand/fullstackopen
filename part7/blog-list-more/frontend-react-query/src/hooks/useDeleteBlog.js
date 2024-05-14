import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { useNotify } from '../contexts/NotificationContext'

const useDelete= () => {
  const queryKey = ['blogs']
  const queryClient = useQueryClient()
  const notify = useNotify()
  const token = JSON.parse(window.localStorage.getItem('loggedBlogToken'))

  return useMutation(
    deletedBlog => blogService.deleteBlog(deletedBlog, token),
    {
      onMutate: async (deletedBlog) => {
        queryClient.setQueryData(queryKey, oldData => {
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
        queryClient.invalidateQueries(queryKey)
        notify('Blog deleted successfully')
        console.log('Mutation successful with data:', data)
      },
      onError: (error, deletedBlog, context) => {
        queryClient.setQueryData(queryKey, context.previousBlogs)
        notify(error)
        console.error('Failed to delete blog: ', error)
      }
    }
  )
}

export default useDelete