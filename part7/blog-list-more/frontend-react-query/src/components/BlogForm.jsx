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

const BlogForm = () => {
  const createBlog = useCreateBlog()
  const { authState } = useAuth()
  const notify = useNotify()
  const navigate = useNavigate()

  if (!authState) {
    notify('Please log in.')
    navigate('/login')
  }

  const onCreate = async (event) => {
    event.preventDefault()
    const { title, author, url } = event.target.elements

    createBlog.mutate({
      title: title.value,
      author: author.value,
      url: url.value
    }, {
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

  return (
    <BlogFormContainer onSubmit={onCreate}>
      <BlogFormLabel htmlFor='title'>Title</BlogFormLabel>
      <BlogFormInput id='title' name='title' placeholder='Enter a title' type='text' aria-label='name' required />
      <BlogFormLabel htmlFor='author'>Author</BlogFormLabel>
      <BlogFormInput id='author' name='author' placeholder='Enter an author' type='text' aria-label='name' required />
      <BlogFormLabel htmlFor='url'>URL</BlogFormLabel>
      <BlogFormInput id='url' name='url' placeholder='Enter a URL' type='text' aria-label='url' required />
      <BlogButton type='submit'>Create</BlogButton>
    </BlogFormContainer>
  )
}

export default BlogForm
