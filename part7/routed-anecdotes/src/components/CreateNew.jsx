import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitting form with the following values:')
    console.log('Content:', content.value)
    console.log('Author:', author.value)
    console.log('Info:', info.value)

    props.addNew(
      {
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      }
    )
    navigate('/')
    content.onClear()
    author.onClear()
    info.onClear()
  }

  const handleReset = () => {
    content.onClear()
    author.onClear()
    info.onClear()
  }

  return (
    <div>
      <h2>New anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input {...content} placeholder='content'/>
        </div>
        <div>
          <input {...author} placeholder='author'/>
        </div>
        <div>
          <input {...info} placeholder='URL for more info'/>
        </div>
        <button>Submit</button>
        <br />
        <button onClick={handleReset}>Reset</button>
      </form>
    </div>
  )

}

export default CreateNew