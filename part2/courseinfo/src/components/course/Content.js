import React from 'react'

import Part from '../course/content/Part'

const Content = ({ parts }) => {
  return (
    <div>
    {parts.map((part, index) => (
      <Part key={index} name={part.name} numberOfExercises={part.exercises}/>
    ))}
  </div>
  )
}

export default Content