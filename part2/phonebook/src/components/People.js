import React from 'react'
import Person from './Person'

const People = ({ people, handleDelete }) => {
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
          {people.map((person) => <Person key={person.name} person={person} handleDelete={() => handleDelete(person.id)} />)}
        </tbody>
      </table>
    </div>
  )
}

export default People