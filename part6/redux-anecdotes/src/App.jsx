import { useEffect } from 'react'
import Anecdotes from './components/AnecdoteList'
import NewAnecdote from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])
  
  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <hr />
      <br />
      <Filter />
      <Anecdotes />
      <hr />
      <NewAnecdote />
    </div>
  )
}

export default App