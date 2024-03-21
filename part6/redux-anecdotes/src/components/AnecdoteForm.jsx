import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {

  const dispatch = useDispatch()

  // Add new anecdote logic
  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(displayNotification(`You added '${content}'`, 2))
    console.log(content)
  }

  return (
    <>
      <form onSubmit={addAnecdote}>
        <div>
          <label>New anecdote</label>
          <input name='anecdote' placeholder='2 years ago,I had...'/>
        </div>
        <button type="submit"> Save </button>
      </form>
    </>
  )
}

export default NewAnecdote