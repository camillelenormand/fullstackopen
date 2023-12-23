import { filterChange } from '../reducers/anecdoteFilterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const search = event.target.value.trim()
    dispatch(filterChange(search))
    // input-field value is in variable event.target.value
  }

  return (
    <div className="input-icon-wrapper">
       <i className="fa fa-search icon"></i>
      <input type='text' placeholder="Enter your search... " onChange={handleChange} />
    </div>
  )
}

export default Filter