import React from 'react'
import Title from './Title'


const Search = ({ searchQuery, onChange }) => {

  return (
    <>
      <Title label="Search for a country" size="h4" />
      <form>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={onChange}
          />
        </form>
    </>
  )
}

export default Search