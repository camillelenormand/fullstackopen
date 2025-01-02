import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK } from '../mutations'
import { ALL_BOOKS } from '../queries'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [error, setError] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
    }
  })

  const submit = async (event) => {
    event.preventDefault()


    createBook({ variables: { title, author, published: parseInt(published), genres: genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label>Author</label>
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label>Published</label>
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <label>Genres</label>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            Add
          </button>
        </div>
        <div><span>Genres List: {genres.join(' ')}</span></div>
        <button type="submit">New book</button>
      </form>
    </div>
  )
}

export default NewBook