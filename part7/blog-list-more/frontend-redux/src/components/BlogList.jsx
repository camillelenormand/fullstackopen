import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, getAllBlogs } from '../store/blogReducer'
import styled from 'styled-components'
import { useEffect } from 'react'

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centers the cards in the container */
  gap: 20px; /* Spacing between cards */
  margin: 20px auto; /* Adjust as needed */
  padding: 0 20px; /* Padding on the sides */
`

const Card = styled.div`
  background-color: white;
  border-radius: 20px;
  border: 2px solid #e0e0e0;
  width: calc((100% - 100px) / 5); /* Adjust based on gap and container padding */
  margin-bottom: 20px; /* Spacing between rows */
  overflow: hidden;
`

const CardContent = styled.div`
  padding: 30px;
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
const Button = styled.button`
  padding: 10px;
  border: none;
  margin-right: 10px;
  border-radius: 4px;
  background-color: ${props => props.color || '#007bff'};
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${props => props.color === 'red' ? '#dc3545' : '#0056b3'};
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`


const BlogList = () => {
  const dispatch = useDispatch()
  const { blogs, isLoading } = useSelector(state => state.blogs)
  console.log('blogs', blogs)

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [dispatch])

  const handleDelete = async (event) => {
    const id = event.target.id
    console.log('id', id)
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        dispatch(deleteBlog(id))
      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }
  }

  return (
    <>
      {isLoading ? (
        <LoadingMessage>Loading blogs...</LoadingMessage>
      ) : blogs.length > 0 ? (
        <CardsContainer>
          {blogs.map((blog) => (
            <Card key={blog.id}>
              <CardContent>
                <h3>{blog.title}</h3>
                <p>Author: {blog.author}</p>
                <p>
                  <UrlLink href={blog.url} target="_blank" rel="noreferrer noopener">
                    Visit
                  </UrlLink>
                </p>
                <p>{blog.likes} likes</p>
                <div>
                  <Button>Edit</Button>
                  <Button>Like</Button>
                  <Button
                    id={blog.id}
                    onClick={handleDelete}
                    color='red'>Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardsContainer>
      ) : (
        <NoBlogsMessage>No blogs found.</NoBlogsMessage>
      )}
    </>
  )
}

export default BlogList
