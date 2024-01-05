import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

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
  }

  return (
    <div>
      <h3>Anecdotes</h3>
    
      <Notification />
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
