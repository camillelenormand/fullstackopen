import Part from './Part'

const Content = ({ parts }) => {
  
    return (
      <div>
        {parts.map((part, index) => (
          <Part key={index} partName={part.name} exercisesName={part.exercises}/>
        ))}
      </div>
  )
}

export default Content