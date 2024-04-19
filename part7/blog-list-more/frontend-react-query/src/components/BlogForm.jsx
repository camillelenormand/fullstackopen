import { 
  BlogFormContainer, 
  BlogFormInput, 
  BlogFormLabel,
  BlogButton
} from './BlogFormStyles'
import useCreateMutation from '../hooks/useCreateMutation'
import { useAuth } from '../contexts/AuthContext'
import { useNotify } from '../contexts/NotificationContext'

const BlogForm = () => {
  const createBlogMutation = useCreateMutation()
  const user = useAuth()
  const notify = useNotify()

  if (!user) {
    // Optionally handle the absence of a token, e.g., redirect to login or show a message.
    console.error('Please log in.')
    notify('Please log in.')
  }

  const onCreate = async (event) => {
    event.preventDefault()
    const { title, author, url } = event.target.elements
    console.log('title:', title.value, 'author:', author.value, 'url:', url.value)

    createBlogMutation.mutate({ 
      title: title.value, 
      author: author.value,
      url: url.value
    })

    event.target.reset()
  }

  return (
    <BlogFormContainer onSubmit={onCreate}>
      <BlogFormLabel htmlFor='title'>Title</BlogFormLabel>
      <BlogFormInput id='title' name='title' required/>
      <BlogFormLabel htmlFor='author'>Author</BlogFormLabel>
      <BlogFormInput id='author' name='author' required/>
      <BlogFormLabel htmlFor='url'>URL</BlogFormLabel>
      <BlogFormInput id='url' name='url' required/>
      <BlogButton type='submit'>Create</BlogButton>
    </BlogFormContainer>
  )
}

export default BlogForm
