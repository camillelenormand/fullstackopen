import blogService from '../services/blogs'
import { useNotify } from '../contexts/NotificationContext'
import { useMutation } from 'react-query'
import { useQueryClient } from 'react-query'


const useCreateCommentMutation = (blogId) => {
  const notify = useNotify()
  const queryKey = ['blogs']
  const queryClient = useQueryClient()

  return useMutation(
    newComment => blogService.createComment(blogId, newComment),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(queryKey)
        notify('Comment created successfully')
        console.log('Mutation successful with data:', data)
      },
      onError: (error) => {
        notify(error.response.data.error)
        console.error('Failed to create comment: ', error)
      }
    }
  )
}

export default useCreateCommentMutation