import React from 'react'
import PropTypes from 'prop-types';


const Filter = ({ newSearch, handleSearch }) => {

  return(
    <div>
      <h3>Search</h3>
        <input 
          placeholder='Enter a name'
          value={newSearch}
          onChange={handleSearch}
        />
    </div>
  )
}

Filter.propTypes = {
  newSearch: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired
}

export default Filter