import { 
  BlogFormContainer, 
  BlogFormInput, 
  BlogFormButton, 
  BlogFormLabel 
} from './BlogFormStyles'
import useCreateMutation from '../hooks/useCreateMutation'

const BlogForm = () => {
  const createBlogMutation = useCreateMutation()
  const token = JSON.parse(window.localStorage.getItem('loggedBlogToken'))

  if (!token) {
    // Optionally handle the absence of a token, e.g., redirect to login or show a message.
    console.error('No authentication token found. Please log in.')
    return null // or other handling
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

    event.target.reset();

  }

  return (
    <BlogFormContainer onSubmit={onCreate}>
      <BlogFormLabel htmlFor='title'>Title</BlogFormLabel>
      <BlogFormInput id='title' name='title' required/>
      <BlogFormLabel htmlFor='author'>Author</BlogFormLabel>
      <BlogFormInput id='author' name='author' required/>
      <BlogFormLabel htmlFor='url'>URL</BlogFormLabel>
      <BlogFormInput id='url' name='url' required/>
      <BlogFormButton type='submit'>Create</BlogFormButton>
    </BlogFormContainer>
  )
}

export default BlogForm
