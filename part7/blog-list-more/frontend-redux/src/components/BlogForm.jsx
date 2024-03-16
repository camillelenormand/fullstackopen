import { createBlog } from '../store/blogReducer'
import { useDispatch } from 'react-redux'
import Title from './Title'

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = async e => {
    e.preventDefault()
    const newTitle = e.target.title.value
    const newAuthor = e.target.author.value
    const newUrl = e.target.url.value

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    dispatch(createBlog(newBlog))
    console.log('blog content: ', newBlog)
  }

  return (
    <>
      <Title text="New article" />
      <form onSubmit={addBlog}>
        <label id='titleLabel'>Title</label>
        <input
          id='title'
          type="text"
          name="title"
          placeholder='Enter a title'
          aria-labelledby='titleLabel'
        />
        <label id='authorLabel'>Author</label>
        <input
          id='author'
          type="text"
          name="author"
          placeholder='Enter an author'
          aria-labelledby='authorLabel'
        />
        <label id='urlLabel'>URL</label>
        <input
          id='url'
          type="text"
          name="url"
          placeholder='Enter a URL'
          aria-labelledby='urlLabel'
        />
        <button id="createButton" type="submit">Save</button>
      </form>
    </>
  )
}

export default BlogForm;
