import React from 'react'
import Title from './Title'
import Image from './Image'

const CountriesCoatOfArms = ({ country }) => {
  return (
    <>
      <Title label="Coat of arms" size="h3"/>
      <Image src={country.coatOfArms.png} alt={country.name.common} width="200" height="200"/>
      <hr />
    </>
  )
}

export default CountriesCoatOfArms