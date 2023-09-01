import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = e => {
    e.preventDefault();
    createBlog({
      title,
      author,
      url
    });
    console.log("Adding blog", { title, author, url });
    console.log("clearing values...");
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  console.log("Rendering with state values:", { title, author, url });

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          name="Title"
          onChange={e => {
            console.log("Title input value:", e.target.value);
            setTitle(e.target.value);
          }}
        />
        <label>Author:</label>
        <input
          type="text"
          value={author}
          name="Author"
          onChange={e => {
            console.log("Author input value:", e.target.value);
            setAuthor(e.target.value);
          }}
        />
        <label>URL</label>
        <input
          type="text"
          name="Url"
          value={url}
          onChange={e => {
            console.log("URL input value:", e.target.value);
            setUrl(e.target.value);
          }}
        />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default BlogForm;
