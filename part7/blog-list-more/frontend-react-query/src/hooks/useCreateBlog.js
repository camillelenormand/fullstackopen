import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { useNotify } from '../contexts/NotificationContext'
import storageService from '../services/storage'

const useCreateMutation = () => {
  const queryKey = ['blogs']
  const queryClient = useQueryClient()
  const notify = useNotify()

  return useMutation(
    newBlog => blogService.createBlog(newBlog, storageService.loadUser().token),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(queryKey)
        notify(`Blog created successfully: ${data.title} by ${data.author}`, 'success')
        console.log('Mutation successful')
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