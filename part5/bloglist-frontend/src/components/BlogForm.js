import { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = e => {
    e.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    console.log("Adding blog", { title, author, url })
    console.log("clearing values...")
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  console.log("Rendering with state values:", { title, author, url })

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <label id='titleLabel'>Title</label>
        <input
          id='title'
          type="text"
          name="Title"
          placeholder='Enter a title'
          aria-labelledby='titleLabel'
          value={title}
          onChange={e => {
            console.log("Title input value:", e.target.value)
            setTitle(e.target.value)
          }}
        />
        <label id='authorLabel'>Author</label>
        <input
          id='author'
          type="text"
          name="Author"
          placeholder='Enter an author'
          aria-labelledby='authorLabel'
          value={author}
          onChange={e => {
            console.log("Author input value:", e.target.value)
            setAuthor(e.target.value)
          }}
        />
        <label id='urlLabel'>URL</label>
        <input
          id='url'
          type="text"
          name="url"
          placeholder='Enter a URL'
          aria-labelledby='urlLabel'
          value={url}
          onChange={e => {
            console.log("URL input value:", e.target.value)
            setUrl(e.target.value)
          }}
        />
        <br />
        <button id="createButton" type="submit">Save</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm;
