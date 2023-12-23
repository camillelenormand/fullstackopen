import { filterChange } from "../reducers/anecdoteFilterReducer"
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const search = event.target.value
    dispatch(filterChange(search))
    // input-field value is in variable event.target.value
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input type='text' onChange={handleChange} />
    </div>
  )
}

export default Filter