// import components, react features and other libraries

// React
import { useState, useEffect } from 'react'

// Components
import PersonForm  from './components/PersonForm'
import People from './components/People'
import Filter from './components/Filter'
import phoneService from './services/phoneService'
import Notification from './components/Notification'

// Other Libraries
import axios from 'axios'

// App
const App = () => {
  const [newName, setNewName, ] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState("");
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState("")

  // get all data from server
  useEffect(() => {
    console.log("effect");
    phoneService
      .getAllPersons()
      .then(response => {
        console.log('response', response)
        setPersons(response)        
      })
      .catch(error => {
        setMessage(error.message)
        setColor('red')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }, [])

  // Delete a person from list
  const handleDelete = (id,) => {
    const person = persons.find(p => p.id === id)
    console.log('person', person)
    // Display popup to confirm person deletion
    if (window.confirm(`Delete ${person.name}?`))
    phoneService
      .deletePerson(id)
      .then(() => {
        phoneService
          .getAllPersons()
          .then((person) => {
            console.log('person', person)
            setPersons(person)
            setMessage(`${person.name} was deleted`)
            setColor('green')
          })
      })
        .catch(error => {
          setMessage(error.message)
          setColor('red')
          setTimeout(() => {
            setMessage(null)
          }, 5000
        )
    })
  }

  // Get name value from input
  const handleChangeName = (e) => {
    const newValue = e.target.value
    setNewName(newValue);
  }

  // Get phone number value from input
  const handleChangePhoneNumber = (e) => {
    const newValue = e.target.value
    setNewPhoneNumber(newValue);
  }

  // Add new person to list
  const handleSubmit = (e) => {
    e.preventDefault()
    // Check if name already exists
    const existingPerson = persons.find(person => person.name === newName)
    const newPerson = {
      name: newName,
      number: newPhoneNumber
    }
    // Check if person exists
    if (existingPerson) {
      // Find related person
      const newPeople = {...existingPerson, newPerson}
      // Display popup to confirm person update
      const answer = window.confirm(`${newName} was already added to the phone book. Do you want to replace the old number with the new one for ${newName}?`)
      console.log(answer)
      // Update existing person if answer is true
      if (answer) {
        console.log("update")
        phoneService
          .updatePerson(existingPerson.id, newPeople)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setMessage(`${returnedPerson.name} updated!`)
            setColor('green')
            setNewName('')
            setNewPhoneNumber('')
          })
          .catch(error => {
            setMessage(`${newName} was already removed from the server`) 
            setColor('red')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            })
            setPersons(persons.filter(person => person.name !== newName))
      } 
    } else {
      // Add new person
      axios 
        .post('http://localhost:3001/api/persons', newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setMessage(`${newName} added!`)
          setColor('green')
          setNewName('')
          setNewPhoneNumber('')
        })
        .catch(error => {
          setMessage(error.message)
          setColor('red')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  
  return (
    <div>
      <h1>Phone Book</h1>
        <Notification message={message} color={color}/>
        <Filter setFilter={setFilter} filter={filter} />
        
        <PersonForm 
          handleSubmit={handleSubmit}
          newName={newName}
          newPhoneNumber={newPhoneNumber}
          handleChangePhoneNumber={handleChangePhoneNumber}
          handleChangeName={handleChangeName}
        />
          
        <People 
          filter={filter}
          people={persons}
          handleDelete={handleDelete}
        />
    </div>
  )
}

export default App