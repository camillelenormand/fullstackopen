import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useReducer } from 'react'
import notificationReducer from '../reducers/notificationReducer'
import Notification from './Notification'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useReducer(notificationReducer, ' ')

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) => [...oldAnecdotes, newAnecdote]);
    },
    onError: (error) => {
      console.log(error)
      notificationDispatch({ type: 'SHOW_NOTIFICATION', message: error.response.data.error})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()

    if (content.length < 5) {
      // Handle the error, e.g., by showing a notification
      notificationDispatch({ 
        type: 'SHOW_NOTIFICATION', 
        message: 'Anecdote is too short. Please enter at least 5 characters.' 
      })
      return 
    }

    newAnecdoteMutation.mutate({ content, vote: 0 })
    event.target.anecdote.value = ''

    notificationDispatch({ type: 'SHOW_NOTIFICATION', message: 'Created!' })
    const timer = setTimeout(() => {
      notificationDispatch({ type: 'SHOW_NOTIFICATION', message: '' });
    }, 5000)

    return () => clearTimeout(timer)
  }

  return (
    <div>
      <Notification message={notification.message} />
      <form onSubmit={onCreate}>
        <input name='anecdote' placeholder='Enter a new anecdote...' disabled={newAnecdoteMutation.isLoading}/>
        <button type='submit' disabled={newAnecdoteMutation.isLoading}>
          {newAnecdoteMutation.isLoading ? 'Creating...' : 'New'}
        </button>
      </form>
      {newAnecdoteMutation.isLoading && <p>Creating your anecdote...</p>}
    </div>
  )
}

export default AnecdoteForm
