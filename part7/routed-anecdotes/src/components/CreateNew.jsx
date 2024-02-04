import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew(
      {
        content,
        author,
        info,
        votes: 0
      }
    )
    navigate('/')
  }

  return (
    <div>
      <h2>New anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content: 
          <input {...content} />
        </div>
        <div>
          Author:    
          <input {...author} />
        </div>
        <div>
          URL for more info: 
          <input {...info} />
        </div>
        <button>Save</button>
      </form>
    </div>
  )

}

export default CreateNew