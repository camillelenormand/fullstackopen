import { createBlog, setError } from '../store/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import Title from './Title'
import { displayNotification } from '../store/notificationsReducer'
import styled from 'styled-components'

// Styled components

const StyledForm = styled.form`
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`

const FormField = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 100%;
`

const StyledLabel = styled.label`
  margin-right: 10px;
`

const StyledInput = styled.input`
  padding: 10px;
  margin: 0;
  flex-grow: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const StyledButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  flex-basis: 100%;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`

const Message = styled.p`
  color: ${({ isError }) => (isError ? 'red' : 'black')};
  flex-basis: 100%;
`

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
      <StyledForm onSubmit={addBlog}>
        <FormField>
          <StyledLabel htmlFor='title'>Title:</StyledLabel>
          <StyledInput
            id='title'
            type="text"
            name="title"
            placeholder='Enter a title'
          />
        </FormField>
        <FormField>
          <StyledLabel htmlFor='author'>Author:</StyledLabel>
          <StyledInput
            id='author'
            type="text"
            name="author"
            placeholder='Enter an author'
          />
        </FormField>
        <FormField>
          <StyledLabel htmlFor='url'>URL:</StyledLabel>
          <StyledInput
            id='url'
            type="text"
            name="url"
            placeholder='Enter a URL'
          />
        </FormField>
        <StyledButton id="createButton" type="submit" disabled={isLoading}>Save</StyledButton>
        {isLoading && <Message>Loading...</Message>}
        {error && <Message isError>{error}</Message>}
      </StyledForm>
    </>
  )
}


export default BlogForm;
