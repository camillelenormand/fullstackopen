import React from 'react'
import Title from './Title'
import Image from './Image'

const CountriesFlag = ({ country }) => {
  return (
    <>
      <Title label="Flag" size="h3"/>
      <Image src={country.flags.png} alt={country.name.common} width="100" height="100"/>
      <hr />
      <br />
    </>
  )
}

export default CountriesFlag