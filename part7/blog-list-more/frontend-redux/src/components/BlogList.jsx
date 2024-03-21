import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../store/blogReducer'
import styled from 'styled-components'
import { useEffect } from 'react'


const BlogContainer = styled.article`
  font-family: Arial, sans-serif;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const BlogTitle = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-size: 1.2em;
  margin-bottom: 8px;
  font-weight: 500; /* Slightly bolder for emphasis */
`

const Metadata = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9em;
  color: #90a4ae; /* Google's Material Design grey */
`

const Author = styled.p`
  font-family: 'Roboto', sans-serif;
  margin-right: 16px;
`

const Url = styled.a`
  font-family: 'Roboto', sans-serif;
  color: #1a73e8; /* Google blue */
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Blog = ({ blog }) => {
  const { author, url, title } = blog

  return (
    <BlogContainer>
      <BlogTitle>{title}</BlogTitle>
      <Metadata>
        <Author><i>- {author}</i></Author>
        <Url href={url} target="_blank" rel="noreferrer noopener">
          {url}
        </Url>
      </Metadata>
    </BlogContainer>
  )
}

const BlogList = () => {
  const dispatch = useDispatch()
  const { blogs, isLoading } = useSelector(state => state.blogs) // state.blogs is from the blogReducer.js file

  console.log('blogs', blogs)
  console.log('isLoading', isLoading)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <div>
      {isLoading ? (
        <div>Loading blogs...</div>
      ) : (
        blogs.length > 0 ? (
          blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))
        ) : (
          <div>No blogs found.</div>
        )
      )}
    </div>
  )
}

export default BlogList
