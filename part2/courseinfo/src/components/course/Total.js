
const Total = ({ parts }) => {
  console.log(parts)

  const result = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      <p>Number of exercises: {result}</p>
    </div>
  )
}

export default Total