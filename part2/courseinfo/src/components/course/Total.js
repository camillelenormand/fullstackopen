import React from 'react'

const Total = ({ parts }) => {
  console.log(parts)

  const result = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <p><b>Number of exercises: <em>{result}</em></b></p>
    </div>
  )
}

export default Total