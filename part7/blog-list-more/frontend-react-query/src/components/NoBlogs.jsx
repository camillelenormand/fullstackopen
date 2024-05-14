import styled from 'styled-components'


const NoBlogsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const NoBlogsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 10px;
  text-align: center;
`

const NoBlogs = () => {
  return (
    <NoBlogsContainer>
      <NoBlogsTitle>No blogs available</NoBlogsTitle>
    </NoBlogsContainer>
  )
}

export default NoBlogs