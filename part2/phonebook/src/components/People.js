import React from 'react'
import Person from './Person'
import PropTypes from 'prop-types'

const People = ({ people, handleDelete, filter }) => {
  
  const filteredPeople = people.filter((person) => person.name?.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Contacts</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPeople.map((person) => (
            <Person key={person.id} person={person} handleDelete={() => handleDelete(person.id)} filter={filter} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

People.propTypes = {
  people: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default People
