import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
      setCountries([]);
    }
  }, [searchQuery]);

  const onChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCountries = countries.filter(country => {
    const countryName = country.name.common.toLowerCase(); // Use 'name.common'
    return countryName.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="App">
      <header className="countries-header">
        <h1>Countries</h1>
      </header>
      <form>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={onChange}
        />
      </form>
      {filteredCountries.length >= 10 ? (
        <p>Error: Too many results found. Please refine your search.</p>
      ) : filteredCountries.length > 0 ? (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.name.common}>{country.name.common}</li>
          ))}
        </ul>
      ) : (
        <p>No countries found.</p>
      )}
    </div>
  );
}

export default App;
