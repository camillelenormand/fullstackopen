import { useQuery } from '@apollo/client'
import Persons from './Person'
import PersonForm from './PersonForm'
import { ALL_PERSONS } from './queries'
import { useState } from 'react'
import { Error } from './Error'
import PhoneForm from './PhoneForm'
import 'simpledotcss/simple.min.css'


const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS, {
    pollInterval: 2000
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  const error = (errorMessage) => {
    setErrorMessage(errorMessage)
    setTimeout(() => {
      setErrorMessage(null)
    }, 1000)
  }

  return (
    <div>
    <Error errorMessage={errorMessage} />
    <Persons persons={result.data.allPersons}/>
    <PersonForm setError={error}/>
    <PhoneForm setError={error} />
    </div>
  )
}

export default App