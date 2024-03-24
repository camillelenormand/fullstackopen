import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'

import { useNotify } from '../contexts/NotificationContext'

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
    <form onSubmit={onCreation}>
      <label htmlFor='title'>Title</label>
      <input id='title' name='title' />
      <label htmlFor='author'>Author</label>
      <input id='author' name='author' />
      <label htmlFor='url'>URL</label>
      <input id='url' name='url' />
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm
