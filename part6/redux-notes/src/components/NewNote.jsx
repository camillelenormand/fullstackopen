import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
import noteService from '../services/notes'

const NewNote = () => {

  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    const newNote = await noteService.createNew(content)
    dispatch(createNote(newNote))
  }

  return (
    <>
      <form onSubmit={addNote}>
        <br />
        <label>Title</label>
        <input name="note" placeholder='Enter your note'/>
        <br />
        <button type="submit">Save</button>
      </form>
    </>
  )
}

export default NewNote