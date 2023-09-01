import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ 
      title: title,
      author: author, 
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
        <form onSubmit={addBlog}>
          <label>Title:</label>
          <input 
            type="text" 
            value={title}
            name="Title"
            onChange={e => setTitle(e.target.value)}
          />
          <label>Author:</label>
          <input 
            type="text"
            value={author}
            name="Author"
            onChange={e => setAuthor(e.target.value)}
          />
          <label>URL</label>
          <input 
            type="text"
            name="Url"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <br />
          <button type="submit">Save</button>
        </form>
    </div>
  )
}

export default BlogForm