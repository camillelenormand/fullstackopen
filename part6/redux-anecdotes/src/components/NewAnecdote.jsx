import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {

  const dispatch = useDispatch()

  // Add new anecdote logic
  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    console.log(content)
    e.target.anecdote.value = ''

    // Send anecdote content to store
    dispatch(createAnecdote(content))
  }

  return (
    <>
      <h5> Enter a new anecdote </h5>
      <form onSubmit={addAnecdote}>
        <div>
          <label>New anecdote</label>
          <input name='anecdote' placeholder='Once upon a time...'/>
        </div>
        <button type="submit"> Save </button>
      </form>
    </>
  )
}

export default NewAnecdote