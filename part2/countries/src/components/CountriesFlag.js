import React from 'react'

const CountriesFlag = ({ country }) => {
  return (
    <>
      <h3>Flag</h3>
        <img src={country.flags.png} alt={country.name.common} width={"200"}/>
      <hr />
      <br />
    </>
  )
}

export default CountriesFlag