import React from "react"

const CountriesDetails = ({ country }) => {
  return (
    <>
      <h3>Details</h3>
      <ul>
        <li>Capital: {country.capital}</li>
        <li>Population: {country.population}</li>
        <li>Region: {country.region}</li>
        <li>Sub Region: {country.subregion}</li>
      </ul>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <hr />
    </>
  )
}

export default CountriesDetails