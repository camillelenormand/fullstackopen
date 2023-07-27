import React from 'react'


const Search = ({ searchQuery, onChange }) => {

  return (
    <>
      <h1>Search a country</h1>
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