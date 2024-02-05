import React, { useState, useEffect } from 'react'
import countriesService from './services/countryService'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    console.log(name)
    if(!name.trim()) {
      setCountry(null)
    }

    countriesService
    .getCountry(name.toLowerCase())
    .then((response) => {
      if (response) {
        setCountry({ data: response, found: true })
      } else {
        setCountry({ data: null, found: false })
      }
    })
    .catch((error) => {
      console.error(`Something went wrong: ${error.message}`)
      setCountry({ data: null, found: false })
    })
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <ul>
        <li>Capital City: {country.data.capital}</li>
        <li>Population: {country.data.population} inhabitants</li>
      </ul>
      <img src={country.data.flags.svg} height='100' alt={country.data.flags.alt}/>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App