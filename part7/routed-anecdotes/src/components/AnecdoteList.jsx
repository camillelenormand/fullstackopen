import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}><i>&quot;{anecdote.content}&quot;</i></Link><p> by {anecdote.author}</p>
          </li>
        )}
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