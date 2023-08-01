import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import People from './components/People'
import Filter from './components/Filter'
import phoneService from './services/phoneService'
import Notification from './components/Notification'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('')

  const handleErrorMessage = (error) => {
    setMessage(error.message)
    setColor('red')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await phoneService.getAllPersons()
        setPersons(response)
      } catch (error) {
        handleErrorMessage(error)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    try {
      const person = persons.find((p) => p.id === id)
  
      if (window.confirm(`Delete ${person.name}?`)) {
        await phoneService.deletePerson(id)
  
        // Refresh the list of persons from the server
        const updatedPersons = await phoneService.getAllPersons()
        setPersons(updatedPersons)
  
        setMessage(`${person.name} was deleted`)
        setColor('green')
      }
    } catch (error) {
      handleErrorMessage(error)
    }
  }

  const handleChangeName = (e) => {
    setNewName(e.target.value)
  }

  const handleChangePhoneNumber = (e) => {
    setNewPhoneNumber(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const existingPerson = persons.find((person) => person.name === newName)
    const newPerson = {
      name: newName,
      number: newPhoneNumber,
    }

    if (existingPerson) {
      const updatedPerson = { ...existingPerson, ...newPerson }
      const answer = window.confirm(
        `${newName} was already added to the phone book. Do you want to replace the old number with the new one for ${newName}?`
      )

      if (answer) {
        try {
          if (phoneService && phoneService.updatePerson) {
            const returnedPerson = await phoneService.updatePerson(
              existingPerson.id,
              updatedPerson
            )
            console.log("returnedPerson", returnedPerson)
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            )
            setMessage(`${returnedPerson.name} updated!`)
            setColor('green')
            setNewName('')
            setNewPhoneNumber('')
          } else {
            throw new Error('phoneService or phoneService.updatePerson is not defined')
          }
        } catch (error) {
          handleErrorMessage(error)
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.name !== newName)
          )
        }
      }
    } else {
      try {
        if (phoneService && phoneService.createPerson) {
          const response = await phoneService.createPerson(newPerson)
          setPersons((prevPersons) => [...prevPersons, response]) // Update state correctly
          setMessage(`${newName} added!`)
          setColor('green')
          setNewName('')
          setNewPhoneNumber('')
        } else {
          throw new Error('phoneService or phoneService.createPerson is not defined')
        }
      } catch (error) {
        handleErrorMessage(error)
      }
    }
  }

  return (
    <div>
      <h1>Phone Book</h1>
      <Notification message={message} color={color} />
      <Filter setFilter={setFilter} filter={filter} />

      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleChangePhoneNumber={handleChangePhoneNumber}
        handleChangeName={handleChangeName}
      />

      <People filter={filter} people={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App
