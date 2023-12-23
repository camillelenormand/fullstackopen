import Anecdotes from './components/AnecdoteList'
import NewAnecdote from './components/AnecdoteForm'
import Filter from './components/Filter'

const App = () => {
  
  return (
    <div>
      <h1>Anecdotes</h1>
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