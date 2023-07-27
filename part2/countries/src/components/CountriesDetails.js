import React from "react"
import Title from "./Title"

const CountriesDetails = ({ country }) => {
  return (
    <>
      <Title label="Details" size="h3" />
      <ul>
        <li>Capital: {country.capital}</li>
        <li>Population: {country.population}</li>
        <li>Region: {country.region}</li>
        <li>Sub Region: {country.subregion}</li>
      </ul>
      <Title label="Languages" size="h4" />
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