import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import PropTypes from 'prop-types'
import { showNotification } from '../reducers/anecdoteNotificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <div>
      < br/>
        <i> - {anecdote.content}</i>
      </div>
      < br/>
      <button onClick={handleClick}> {anecdote.votes} Votes </button>
    </>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()

  // Assuming anecdotes are stored under 'anecdotes' in the Redux state
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  // Filter and sort anecdotes
  const filteredAnecdotes = anecdotes
  .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  .sort((a, b) => b.votes - a.votes)

  console.log(filteredAnecdotes)

  if (filteredAnecdotes.length === 0) {
    return <p>No results found for {filter}.</p>
  }

  const voteAndNotify = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(showNotification(`You voted '${anecdote.content}'`))
  }

  return (
    <div>
      {filteredAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => voteAndNotify(anecdote)}
        />
      )}
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired
  }).isRequired,
  handleClick: PropTypes.func.isRequired
}

export default Anecdotes
