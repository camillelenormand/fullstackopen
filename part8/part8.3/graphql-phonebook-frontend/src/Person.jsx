// Persons.js
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { FIND_PERSON } from './queries'

const Person = ({ person, onClose }) => {
  if (!person) return null

  return (
    <div className="person-details">
      <h2>{person.name}</h2>
      <h3>Address</h3>{person.address && (
       <p>
          {person.address.street} {person.address.city}
        </p>
      )}
      <h3>Phone number</h3><p>{person.phone}</p>
      <button onClick={onClose}>close</button>
    </div>
  )
}

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null)
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  })

  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    )
  }

  return (
    <div className="persons-container">
      <h2>Persons</h2>
      <table className="persons-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((p) => (
            <tr key={p.name}>
              <td>{p.name}</td>
              <td>{p.phone}</td>
              <td>
                <button onClick={() => setNameToSearch(p.name)}>
                  Show address
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Persons