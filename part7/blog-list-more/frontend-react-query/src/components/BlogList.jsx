import { useQuery } from 'react-query'
import blogService from '../services/blogs'
import { BlogCard, BlogTitle, BlogAuthor, GridContainer, BlogUrl } from './BlogListStyles'


// Styled components from Step 1 here

const Blogs = () => {
  const { data: blogs, error, isLoading, isError } = useQuery('blogs', blogService.getAllBlogs)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>


  return (
    <GridContainer>
      {blogs.map(blog => (
        <BlogCard key={blog.id}>
          <BlogTitle>{blog.title}</BlogTitle>
          <BlogAuthor>{blog.author}</BlogAuthor>
          <BlogUrl>{blog.url}</BlogUrl>
        </BlogCard>
      ))}
    </GridContainer>
  )
}

export default Blogs
