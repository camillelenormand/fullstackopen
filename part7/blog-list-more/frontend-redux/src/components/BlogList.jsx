import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../store/blogReducer'
import styled from 'styled-components'
import { useEffect } from 'react'

const Table = styled.table`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  border-collapse: collapse;
`

const Thead = styled.thead`
  background-color: #f5f5f5;
`

const Th = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 2px solid #ddd;
`

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`

const UrlLink = styled.a`
  color: #1a73e8;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2em;
  color: #607d8b;
`

const NoBlogsMessage = styled.div`
  text-align: center;
  font-size: 1.2em;
  color: #ff5722;
`

const BlogList = () => {
  const dispatch = useDispatch()
  const { blogs, isLoading } = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <>
      {isLoading ? (
        <LoadingMessage>Loading blogs...</LoadingMessage>
      ) : blogs.length > 0 ? (
        <Table>
          <Thead>
            <tr>
              <Th>Title</Th>
              <Th>Author</Th>
              <Th>URL</Th>
            </tr>
          </Thead>
          <tbody>
            {blogs.map((blog) => (
              <Tr key={blog.id}>
                <Td>{blog.title}</Td>
                <Td>{blog.author}</Td>
                <Td>
                  <UrlLink href={blog.url} target="_blank" rel="noreferrer noopener">
                    Visit
                  </UrlLink>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <NoBlogsMessage>No blogs found.</NoBlogsMessage>
      )}
    </>
  )
}

export default BlogList
