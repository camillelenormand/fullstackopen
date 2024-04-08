 import BlogForm from '../components/BlogForm'
import BlogList from '../components/BlogList'

const BlogPage = () => { 
  const user = window.localStorage.getItem('loggedBlogUsername')
  console.log('user:', user)

  return (
    <BlogListStyles>
      <BlogForm />
      <BlogList />
    </BlogListStyles>
  )
}

export default BlogPage