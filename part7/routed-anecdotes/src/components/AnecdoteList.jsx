import PropTypes from 'prop-types'

const AnecdoteList = ({ anecdotes }) => {
  if (!anecdotes || anecdotes.length === 0) {
    return (
      <p>No anecdotes available</p>
    )
  }

  return (

    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
          <li key={anecdote.id} >{anecdote.content}</li>)}
      </ul>
    </div>
  )
}

AnecdoteList.propTypes = {
  anecdotes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired
    })
  )
}

export default AnecdoteList