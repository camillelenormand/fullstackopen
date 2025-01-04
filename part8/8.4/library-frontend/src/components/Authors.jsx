import { useMutation, useQuery } from "@apollo/client"
import { ALL_PERSONS } from "../queries"
import { useState } from "react"
import { EDIT_AUTHOR } from "../mutations"
import Select from 'react-select'

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
  const options = authors.map(a => ({
    value: a.name,
    label: a.name
  }))

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: parseInt(birth) } })
    setName([])
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
        <h4>Set author&apos;s birthdate</h4>
        {/* <div>
          <label>Name:</label>
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div> */}
        <Select
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? '#2563eb' : '#e5e7eb',
            boxShadow: state.isFocused ? '0 0 0 1px #2563eb' : 'none',
            '&:hover': {
              borderColor: '#2563eb'
            }
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#dbeafe' : 'white',
            color: state.isSelected ? 'white' : '#111827',
            cursor: 'pointer'
          })
        }}
        className="mb-4"
          options={options}
          onChange={({ value }) => setName(value)} />
        <div>
          <label>Born in:</label>
          <input
            value={birth}
            onChange={({ target }) => setBirth(target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default Authors