import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { BlogFormContainer, BlogFormInput, BlogFormButton, BlogFormLabel } from './BlogFormStyles'

import { useNotify } from '../hooks/useNotify'

const BlogForm = () => {
  const queryClient = useQueryClient()
  const notifyWith = useNotify()

  const blogMutation = useMutation(blogService.createBlog, {
    onSuccess: (title, author, url) => {
      queryClient.invalidateQueries('blogs')
      notifyWith('Blog entitle ', title, ' by ', author, 'was created successfully. More info: at', url)
    },
    onError: (error) => {
      notifyWith('Failed to create blog: ', error)
    }
  })

  const onCreation = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    blogMutation.mutate({ title, author, url })
  }

  return (
    <BlogFormContainer onSubmit={onCreation}>
      <BlogFormLabel htmlFor='title'>Title</BlogFormLabel>
      <BlogFormInput id='title' name='title' />
      <BlogFormLabel htmlFor='author'>Author</BlogFormLabel>
      <BlogFormInput id='author' name='author' />
      <BlogFormLabel htmlFor='url'>URL</BlogFormLabel>
      <BlogFormInput id='url' name='url' />
      <BlogFormButton type='submit'>Create</BlogFormButton>
    </BlogFormContainer>
  )
}

export default BlogForm
