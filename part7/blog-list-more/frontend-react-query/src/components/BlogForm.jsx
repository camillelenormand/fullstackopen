import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { 
  BlogFormContainer, 
  BlogFormInput, 
  BlogFormButton, 
  BlogFormLabel 
} from './BlogFormStyles'

import { useNotify } from '../contexts/NotificationContext'

const BlogForm = () => {
  const queryClient = useQueryClient()
  const notifyWith = useNotify()
  const token = JSON.parse(window.localStorage.getItem('loggedBlogToken'))

  if (!token) {
    // Optionally handle the absence of a token, e.g., redirect to login or show a message.
    console.error('No authentication token found. Please log in.')
    return null // or other handling
  }

  const blogMutation = useMutation(
    newBlog => blogService.createBlog(newBlog, token), {
    onSuccess: ({ title, author, url }) => {
      queryClient.invalidateQueries('blogs')
      notifyWith(`'Blog entitled ', ${title}, ' by ', ${author}, 'was created successfully. More info: at', ${url}`)
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.error || 'An unexpected error occurred'
      notifyWith(errorMessage)
      console.error('Failed to create blog: ', error)
    }
  }) 

  const onCreate = async (event) => {
    event.preventDefault()
    const { title, author, url } = event.target.elements
    console.log('title:', title.value, 'author:', author.value, 'url:', url.value)

    blogMutation.mutate({ 
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
