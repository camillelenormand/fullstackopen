import {
  BlogFormContainer,
  BlogFormInput,
  BlogFormLabel,
  BlogButton
} from './BlogFormStyles'
import useCreateBlog from '../hooks/useCreateBlog'
import { useAuth } from '../contexts/AuthContext'
import { useNotify } from '../contexts/NotificationContext'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'

const BlogForm = () => {
  const createBlog = useCreateBlog()
  const notify = useNotify()
  const navigate = useNavigate()

  // Custom hook for handling form input fields
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  console.log(title, author, url)


  const onCreate = async (event) => {
    event.preventDefault()

    createBlog.mutate({
      title: title.value,
      author: author.value,
      url: url.value
    }, 
    {
      onSuccess: () => {
        notify('Blog created successfully.')
        navigate('/')
      },
      onError: (error) => {
        notify(`Failed to create blog: ${error.message}`, 'error')
        event.target.reset()
      }
    })
  }

  const handleChange = (event) => {
    title.onChange(event)
    author.onChange(event)
    url.onChange(event)
  }

  return (
    <BlogFormContainer onSubmit={onCreate}>
      <BlogFormLabel htmlFor='title'>Title</BlogFormLabel>
      <BlogFormInput id='title' name='title' placeholder='Enter a title' type='text' aria-label='name' required onChange={handleChange}/>
      <BlogFormLabel htmlFor='author'>Author</BlogFormLabel>
      <BlogFormInput id='author' name='author' placeholder='Enter an author' type='text' aria-label='name' required onChange={handleChange}/>
      <BlogFormLabel htmlFor='url'>URL</BlogFormLabel>
      <BlogFormInput id='url' name='url' placeholder='Enter a URL' type='text' aria-label='url' required onChange={handleChange}/>
      <BlogButton type='submit'>Create</BlogButton>
    </BlogFormContainer>
  )
}

export default BlogForm
