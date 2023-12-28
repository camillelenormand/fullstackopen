import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = () => {

  const dispatch = useDispatch()

  // Add new anecdote logic
  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newNote = await anecdoteService.createNew(content)
    // Send anecdote content to store
    dispatch(createAnecdote(newNote))
  }

  return (
    <>
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