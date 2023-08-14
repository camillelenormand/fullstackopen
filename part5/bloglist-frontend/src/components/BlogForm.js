const BlogForm = ( { handleCreate, title, setTitle, author, setAuthor, url, setUrl }) => {
  return (
    <div>
      <h2>Create a new blog</h2>
        <form onSubmit={handleCreate}>
          <label>Title:</label>
          <input 
            type="text" 
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <label>Author:</label>
          <input 
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <label>URL</label>
          <input 
            type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <br />
          <button type="submit">Create</button>
        </form>
    </div>
  )
}

export default BlogForm