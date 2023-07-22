import React from 'react'

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

export default Filter