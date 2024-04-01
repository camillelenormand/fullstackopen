import { useQuery, useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { BlogCard, BlogTitle, BlogAuthor, GridContainer, BlogUrl } from './BlogListStyles'
import Button from './Button'
import { useNotify } from '../contexts/NotificationContext'

const Blogs = () => {
  const queryClient = useQueryClient()
  const query = useQuery({ queryKey: ['blogs'], queryFn: blogService.getAllBlogs })
  console.log('query:', query)
  const { isLoading, isError, error } = query

  const notifyWith = useNotify()

  const likeMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onMutate: async (updatedBlog) => {
      await queryClient.cancelQueries(['blogs'])
      const previousBlogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], old => old.map(blog => blog.id === updatedBlog.id ? {...blog, likes: blog.likes + 1} : blog))
      return { previousBlogs }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notifyWith('Blog liked successfully')
      console.log('Mutation successful with data:', data)
    },
    onError: (error, updatedBlog, context) => {
      queryClient.setQueryData(['blogs'], context.previousBlogs)
      notifyWith(error)
      console.error('Failed to like blog: ', error)
    }
  }
  )

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  const handleLike = (blog) => {
    const token = JSON.parse(window.localStorage.getItem('loggedBlogToken'))
    console.log(blog)
    const likedBlog = { ...blog, likes: blog.likes + 1}
    console.log(likedBlog)
    likeMutation.mutate({
      id: likedBlog.id,
      newBlog: likedBlog,
      authToken: token,
    })
  }

  if (query.data && query.data.length === 0) return <div>No blogs to display.</div>


  return (
    <GridContainer>
      {query.data?.map(blog => (
        <BlogCard key={blog.id}>
          <BlogTitle>{blog.title}</BlogTitle>
          <BlogAuthor>{blog.author}</BlogAuthor>
          <BlogUrl as="a" href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</BlogUrl>
          <Button id="like" onClick={() => handleLike(blog)} disabled={likeMutation.isLoading}>{blog.likes} Likes</Button>
        </BlogCard>
      ))}
    </GridContainer>
  )
}

export default Blogs
