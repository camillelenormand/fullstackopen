import React from 'react'
import PropTypes from 'prop-types';


const Filter = ({ setFilter, filter }) => {

  return(
    <div>
      <h3>Search</h3>
        <input 
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
    </div>
  )
}

Filter.propTypes = {
  setFilter: PropTypes.func.isRequired
}

export default Filter