import {
  BlogFormContainer,
  BlogFormInput,
  BlogFormLabel,
  BlogButton
} from './BlogFormStyles'
import useCreateBlog from '../hooks/useCreateBlog'
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

  const onCreate = async (event) => {
    event.preventDefault()

    createBlog.mutate({
      title: title.value,
      author: author.value,
      url: url.value
    }, 
    {
      onSuccess: () => {
        notify(`Blog created successfully: ${title.value} by ${author.value}`, 'success')
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
    <BlogFormInput
      id='title'
      name='title'
      placeholder='Enter a title'
      type={title.type}
      value={title.value}
      onChange={title.onChange}
      aria-label='title'
      required
    />
    <BlogFormLabel htmlFor='author'>Author</BlogFormLabel>
    <BlogFormInput
      id='author'
      name='author'
      placeholder='Enter an author'
      type={author.type}
      value={author.value}
      onChange={author.onChange}
      aria-label='author'
      required
    />
    <BlogFormLabel htmlFor='url'>URL</BlogFormLabel>
    <BlogFormInput
      id='url'
      name='url'
      placeholder='Enter a URL'
      type={url.type}
      value={url.value}
      onChange={url.onChange}
      aria-label='url'
      required
    />
    <BlogButton type='submit'>Create</BlogButton>
  </BlogFormContainer>
  )
}

export default BlogForm
