import { useState, useEffect } from 'react'
import Person  from './components/Person'
import PersonForm  from './components/PersonForm'
import Filter from './components/Filter'
import Axios from 'axios'

const App = () => {
  const [newName, setNewName, ] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  

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

  const handleSearch = (e) => {
    const input = e.target.value
    setNewSearch(input)
  }

  return (
    <div>
      <h2>Phone Book</h2>
        <Filter setNewSearch={setNewSearch} newSearch={newSearch} handleSearch={handleSearch}/>
        
        <PersonForm 
          handleSubmit={handleSubmit}
          newName={newName}
          newPhoneNumber={newPhoneNumber}
          handleChangePhoneNumber={handleChangePhoneNumber}
          handleChangeName={handleChangeName}
        />
          
        <Person 
          persons={persons}
          newSearch={newSearch}
        />
    </div>
  )
}

export default App