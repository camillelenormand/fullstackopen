import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState(
    [
      { 
        name: 'Arto Hellas' 
      }
    ]
  ) 

  const [newName, setNewName] = useState('')

  const handleChange = (e) => {
    setNewName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
  }

  return (
    <div>
      <h2>Phone Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
        {persons.map((person) => {
          return (
            <div key={person.name}>
              {person.name}
            </div>
          )
        })}
    </div>
  )
}

export default App