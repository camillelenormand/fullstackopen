import React from 'react'

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

export default Person