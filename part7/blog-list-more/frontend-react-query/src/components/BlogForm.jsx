import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { BlogFormContainer, BlogFormInput, BlogFormButton, BlogFormLabel } from './BlogFormStyles'

import { useNotify } from '../contexts/NotificationContext'

const BlogForm = () => {
  const queryClient = useQueryClient()
  const notifyWith = useNotify()
  const user = JSON.parse(window.localStorage.getItem('loggedBlogUser'))

  const blogMutation = useMutation(blogService.createBlog, {
    onMutate: () => {
      user === null ? notifyWith('login in please') : notifyWith('Creating blog...')
    },
    onSuccess: (title, author, url) => {
      queryClient.invalidateQueries('blogs')
      notifyWith(`'Blog entitled ', ${title}, ' by ', ${author}, 'was created successfully. More info: at', ${url}`)
    },
    onError: (error) => {
      notifyWith(error.response.data.error)
    }
  }) 

  const onCreate = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    console.log('title:', title, 'author:', author, 'url:', url)
    
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    blogMutation.mutate({ title, author, url })
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
