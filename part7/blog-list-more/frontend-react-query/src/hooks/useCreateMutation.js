import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { useNotify } from '../contexts/NotificationContext'

const useCreateMutation = () => {
  const queryKey = ['blogs']
  const queryClient = useQueryClient()
  const notify = useNotify()
  const token = JSON.parse(window.localStorage.getItem('loggedBlogToken'))

  return useMutation(
    newBlog => blogService.createBlog(newBlog, token),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(queryKey)
        notify(`Blog created successfully: ${data.title} by ${data.author}`, 'success')
        console.log('Mutation successful with data:', data)
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.error || 'Failed to create blog.'
        notify(errorMessage, 'error')
        console.error('Failed to create blog: ', error)
      },
    }
  )

}

export default useCreateMutation