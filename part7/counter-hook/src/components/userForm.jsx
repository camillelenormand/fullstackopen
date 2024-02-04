import useField from "../hooks/useField"

const UserForm = () => {
  const name = useField('text')
  const born = useField('date')
  const height = useField('number')

  return (
    <div>
     <br />
      <form>
        Name: 
        <input {...name} /> 
        <br/> 
        Date of Birth:
        <input {...born}/>
        <br /> 
        Height:
        <input {...height}/>
      </form>
      <br />
      
      <div>
        Name: {name.value} 
        <br />
        Date of Birth: {born.value} 
        <br />
        Height: {height.value} cms
      </div>
    </div>
  )
}

export default UserForm