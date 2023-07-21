import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState(
    [
      { 
        name: 'Arto Hellas',
        phone: '39-44-42424'
      }
    ]
  ) 

  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const handleChangeName = (e) => {
    const newValue = e.target.value
    setNewName(newValue);
  }

  const handleChangePhoneNumber = (e) => {
    const newValue = e.target.value
    setNewPhoneNumber(newValue);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const personExists = persons.some(person => person.name === newName)
    if (personExists) {
      alert(`${newName} was already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        phone: newPhoneNumber
      }
      setPersons([...persons, newPerson])
    }
    setNewName('')
    setNewPhoneNumber('')
  }

  return (
    <div>
      <h2>Phone Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name: 
          <input 
            value={newName}
            onChange={handleChangeName}
          />
        </div>
        <div>
          Phone: 
          <input 
            value={newPhoneNumber}
            onChange={handleChangePhoneNumber}
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
              Name: <b>{person.name}</b> - Phone: <b>{person.phone}</b>
            </div>
          )
        })}
    </div>
  )
}

export default App