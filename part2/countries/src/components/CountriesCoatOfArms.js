import React from 'react'

const CountriesCoatOfArms = ({ country }) => {
  return (
    <>
      <h3>Coat Of Arms</h3>
      <img src={country.coatOfArms.png} alt={country.name.common} width={"200"}/>
      <hr />
    </>
  )
}

export default CountriesCoatOfArms