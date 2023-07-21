import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState(
    [
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]
  ) 

  const [newName, setNewName, ] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const handleSearch = (e) => {
    const input = e.target.value
    setNewSearch(input)
  }

  const results = persons.filter(person => {
    return person.name.toLowerCase().includes(newSearch.toLowerCase())
  })

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
        number: newPhoneNumber
      }
      setPersons([...persons, newPerson])
    }
    setNewName('')
    setNewPhoneNumber('')
  }

  return (
    <div>
      <h2>Phone Book</h2>
      <h3>Search</h3>
        <input 
          placeholder='Enter a name'
          value={newSearch}
          onChange={handleSearch}
        />
      <h3>New Contact</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input 
            value={newName}
            onChange={handleChangeName}
          />
        </div>
        <div>
          <label>Phone</label>
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

export default App