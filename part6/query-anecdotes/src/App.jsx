import AnecdoteForm from './components/AnecdoteForm'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import notificationReducer from './reducers/notificationReducer'
import { useReducer } from 'react'

const Notification = ({ message }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useReducer(notificationReducer, ' ')

   const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
    }
  })

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const anecdotes = data

  const handleVote = (id) => {
    const anecdoteToVote = anecdotes.find(a => a.id === id)
    console.log(anecdoteToVote)
    updateAnecdoteMutation.mutate({ ...anecdoteToVote, votes: anecdoteToVote.votes + 1 })
    notificationDispatch({ type: 'SHOW_NOTIFICATION', message: "Voted!" })
  }

  return (
    <div>
      <h3>Anecdotes</h3>
    
      <Notification message={notification.message} />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            <i> - {anecdote.content}</i>
          </div>
          <p>
            has {anecdote.votes} vote(s).
            <br />
            <br />
            <button onClick={() => handleVote(anecdote.id)}> Vote for it! </button>
          </p>
        </div>
      )}
    </div>
  )
}

export default App
