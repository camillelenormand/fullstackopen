import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './components/Weather'

function App() {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (searchQuery) {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setCountries(response.data);
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
        <h1>Countries</h1>
      </header>
      <main className="App">
        <form>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={onChange}
          />
        </form>
        {filteredCountries.length === 1 ? (
          <article>
            <h2>{filteredCountries[0].name.common}</h2>
              <hr />
            <h3>Details</h3>
              <ul>
                <li>Capital: {filteredCountries[0].capital}</li>
                <li>Area: {filteredCountries[0].area.toLocaleString("en-US")} km²</li>
                <li>Population: {filteredCountries[0].population.toLocaleString("en-US")} inhabitants</li>
                <li>Languages:
                  <ul>
                    {Object.values(filteredCountries[0].languages).map(language => (
                      <li key={language}>{language}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            <h3>Flag</h3>
              <img src={filteredCountries[0].flags.png} alt={filteredCountries[0].name.common} width={"200"}/>
            <h3>Coat Of Arms</h3>
              <img src={filteredCountries[0].coatOfArms.png} alt={filteredCountries[0].name.common} width={"200"}/>
              <hr />
              <br />
            <h3>Weather</h3>
            <Weather city={filteredCountries[0].capital}/>
            <button onClick={() => setCountries([])}>Back</button>
          </article>
        ) : filteredCountries.length >= 10 ? (
          <p>Error: Too many results found. Please refine your search.</p>
        ) : filteredCountries.length > 0 ? (
          <ul>
            {filteredCountries.map(country => (
              <li key={country.name.common}>{country.name.common} : <button onClick={() => setCountries([country])}>Show more</button> </li>
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
