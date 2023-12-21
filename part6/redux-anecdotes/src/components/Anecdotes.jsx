import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import PropTypes from 'prop-types'


const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <div>
        <i> - {anecdote.content}</i>
      </div>
      <div>
        Number of votes: {anecdote.votes}
      </div>
      <button onClick={handleClick}>Vote</button>
    </>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  // Assuming anecdotes are stored under 'anecdotes' in the Redux state
  const anecdotes = useSelector(state => [...state].sort((a, b) => b.votes - a.votes))
  console.log(anecdotes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(voteAnecdote(anecdote.id))}
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
