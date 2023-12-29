import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeNote } from './reducers/noteReducer'

const App = () => {
  const dispatch = useDispatch()

    useEffect(() => {
      dispatch(initializeNote())
    }, [])

  return (
    <div>
      <h2>Create a Note</h2>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App;