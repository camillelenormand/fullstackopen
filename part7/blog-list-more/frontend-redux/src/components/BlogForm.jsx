import { createBlog, setError } from '../store/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import Title from './Title'
import { displayNotification } from '../store/notificationsReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const error = useSelector((state) => state.blogs.error)
  const isLoading = useSelector((state) => state.blogs.isLoading)

  const addBlog = e => {
    e.preventDefault()

    const newTitle = e.target.title.value
    const newAuthor = e.target.author.value
    const newUrl = e.target.url.value

    if (!newTitle.trim() || !newAuthor.trim() || !newUrl.trim()) {
      console.error('Title, author, and URL are required')
      dispatch(setError('Title, author, and URL are required'))
      dispatch(displayNotification('Title, author, and URL are required'))
      return
    }

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    dispatch(createBlog(newBlog))
      .then(() => {
        dispatch(displayNotification(`A new blog "${newTitle}" by ${newAuthor} was added`, 5000, 'success'))
        console.log('New blog added:', newBlog)
        console.log('Notification displayed')
        console.log('Notification hidden after 5 seconds')

      })
      .catch((error) => {
        console.error('Failed to create a new blog:', error)
        dispatch(setError('Failed to create a new blog'))
        dispatch(displayNotification('Failed to create a new blog', 5000, 'error'))
      })

    e.target.reset()
  }

  return (
    <>
      <Title text="New Blog Post" />
      <form onSubmit={addBlog}>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          type="text"
          name="title"
          placeholder='Enter a title'
        />
        <label htmlFor='author'>Author</label>
        <input
          id='author'
          type="text"
          name="author"
          placeholder='Enter an author'
        />
        <label htmlFor='url'>URL</label>
        <input
          id='url'
          type="text"
          name="url"
          placeholder='Enter a URL'
        />
        <button id="createButton" type="submit" disabled={isLoading}>Save</button>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </form>
    </>
  )
}

export default BlogForm;
