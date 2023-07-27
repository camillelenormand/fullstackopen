import React, { useState, useEffect } from 'react'
import countriesService from './services/countriesService'
import Weather from './components/Weather'
import Search from './components/Search'
import CountriesDetails from './components/CountriesDetails'
import CountriesFlag from './components/CountriesFlag'
import CountriesCoatOfArms from './components/CountriesCoatOfArms'
import Button from './components/Button'
import Title from './components/Title'

function App() {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (searchQuery) {
      countriesService
        .getCountries()
        .then(response => {
          setCountries(response);
        })
        .catch(error => {
          alert(`Something went wrong: ${error.message}`);
        });
    } else { 
      setCountries([])
    }
  }, [searchQuery])

  const onChange = (e) => {
    setSearchQuery(e.target.value)
  };

  const filteredCountries = countries.filter(country => {
    const countryName = country.name.common.toLowerCase()
    return countryName.includes(searchQuery.toLowerCase())
  });
  console.log("filteredCountries", filteredCountries)

  return (
    <>
      <header className="countries-header">
        <Title label="Countries" size="h1"/>
      </header>
      <main className="App">
        <Search searchQuery={searchQuery} onChange={onChange} />
        {filteredCountries.length === 1 ? (
          <article>
            <Title label={filteredCountries[0].name.common} size="h2"/>
            <CountriesDetails country={filteredCountries[0]} />
            <CountriesFlag country={filteredCountries[0]} />
            <CountriesCoatOfArms country={filteredCountries[0]} />
            <Weather city={filteredCountries[0].capital}/>
            <Button label="Go back" onClick={() => setSearchQuery('')}/>
          </article>
        ) : filteredCountries.length >= 10 ? (
          <p>Error: Too many results found. Please refine your search.</p>
        ) : filteredCountries.length > 0 ? (
          <ul>
            {filteredCountries.map(country => (
              <li key={country.name.common}>{country.name.common} : <Button label="Show more" onClick={() => setCountries([country])} /></li>
            ))}
          </ul>
        ) : (
          <p>No countries found.</p>
        )}
      </main>
    </>
  )
}

export default App
