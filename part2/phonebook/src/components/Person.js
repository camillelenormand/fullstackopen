import React from 'react'
import PropTypes from 'prop-types';

const Person = ({ persons, newSearch }) => {

  const results = persons.filter(person => {
    return person.name.toLowerCase().includes(newSearch.toLowerCase())
  })

  return(
    <div>
      <h2>Contacts</h2>
        {results.map((person) => {
            return (
              <div key={person.name}>
                Name: <b>{person.name}</b> - Phone: <b>{person.number}</b>
              </div>
            )
          })}
    </div>
  )
}

Person.propTypes = {
  persons: PropTypes.array.isRequired,
  newSearch: PropTypes.string.isRequired
}

export default Person