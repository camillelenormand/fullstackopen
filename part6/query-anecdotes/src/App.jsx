import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'

const App = () => {

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

  const handleVote = (anecdote) => {
    console.log('vote', anecdote)
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
            <button onClick={() => handleVote(anecdote)}>Vote for it!</button>
          </p>
        </div>
      )}
    </div>
  )
}

export default App
