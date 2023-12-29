import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import PropTypes from 'prop-types'
import { displayNotification } from '../reducers/anecdoteNotificationReducer'

// Component to display a single anecdote
const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <div>
        <br />
        <i> - {anecdote.content}</i> {/* Display the anecdote content */}
      </div>
      <br />
      <button onClick={handleClick}> {anecdote.votes} Votes </button> {/* Button to vote on the anecdote */}
    </>
  )
}

// Component to display a list of anecdotes
const Anecdotes = () => {
  const dispatch = useDispatch()

  // Retrieve anecdotes and filter state from the Redux store
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  // Apply filter and sort the anecdotes based on the number of votes
  const filteredAnecdotes = anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)

  // Display a message if no anecdotes are found after filtering
  if (filteredAnecdotes.length === 0) {
    return <p className='notice'>No results found for {filter}.</p>
  }

  // Function to handle voting and displaying notification
  const voteAndNotify = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id)) // Dispatch the voteAnecdote action
      .then(() => {
        dispatch(displayNotification(`You voted '${anecdote.content}'`, 2)) // Show success notification
      })
      .catch(err => {
        console.log(err)
        dispatch(displayNotification('Error occurred while voting. Please try again.', 10)) // Show error notification
      })
  }

  // Render a list of Anecdote components
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

// Define PropTypes for the Anecdote component
Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    content: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    votes: PropTypes.number
  }).isRequired,
  handleClick: PropTypes.func.isRequired
}

export default Anecdotes
