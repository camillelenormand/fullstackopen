import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'


const VisibilityFilter = (props) => {
  const dispatch = useDispatch()

  return (
    <>
      <h5>Filter By:</h5>
      <div>
        All
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange('ALL'))}
        />
        <br />
        Important
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange('IMPORTANT'))}
        />
        <br />
        Non important
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange('NONIMPORTANT'))}
        />
      </div>
      <hr />
    </>
  )
}

export default VisibilityFilter