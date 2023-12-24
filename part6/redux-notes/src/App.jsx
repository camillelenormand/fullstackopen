import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import { useEffect } from 'react'
import noteService from './services/notes'
import { setNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch(
    useEffect(() => {
      noteService.getAll().then(notes => dispatch(setNotes(notes)))
    }, [])
  )

  return (
    <div>
      <h1>Note App</h1>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App;