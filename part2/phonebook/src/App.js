import { useState, useEffect } from 'react'
import PersonForm  from './components/PersonForm'
import People from './components/People'
import Filter from './components/Filter'
import axios from 'axios'
import phoneService from './services/phoneService'


const App = () => {
  const [newName, setNewName, ] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [persons, setPersons] = useState([])

  // get all data from server
  useEffect(() => {
    console.log("effect");
    phoneService
      .getAllPersons()
      .then(response => {
        console.log('response', response)
        setPersons(response)
      })
  }, [])

  const handleDelete = (id,) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`))
    phoneService
      .deletePerson(id)
      .then(() => {
        phoneService
          .getAllPersons()
          .then((person) => {
            setPersons(person)
          })
      })
  }

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
      alert(`${newName} was already added to the phone book`)
    } else {
      const newPerson = {
        name: newName,
        number: newPhoneNumber
      }
      axios 
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewPhoneNumber('')
        })
        .catch(error => {
          console.log(error)
        })
    }
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
          
        <People 
          people={persons}
          handleDelete={handleDelete}
        />
    </div>
  )
}

export default App