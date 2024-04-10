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
        notify(`Blog created successfully: ${data.title} by ${data.author}`)
        console.log('Mutation successful with data:', data)
      },
      onError: (error) => {
        notify(error.response.data.error)
        console.error('Failed to create blog: ', error)
      }
    }
  )

}

export default useCreateMutation