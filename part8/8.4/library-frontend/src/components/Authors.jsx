import { useMutation, useQuery } from "@apollo/client"
import { ALL_PERSONS } from "../queries"
import { useState } from "react"
import { EDIT_AUTHOR } from "../mutations"

const Authors = () => {
  const { data, loading } = useQuery(ALL_PERSONS)
  const [name, setName] = useState('')
  const [birth, setBirth] = useState('')
  const [error, setError] = useState(null)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
    }
  })

  if (loading) return "Loading..."
  if (error) return `Error: ${error.message}`

  const authors = data.allAuthors

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: parseInt(birth) }})
    setName('')
    setBirth('')
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <h4>Edit an author</h4>
        <div>
          <label>Name:</label>
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label>Born in:</label>
          <input
            value={birth}
            onChange={({ target }) => setBirth(target.value)}
          />
        </div>
        <button type="submit">Edit</button>
      </form>
    </div>
  )
}

export default Authors