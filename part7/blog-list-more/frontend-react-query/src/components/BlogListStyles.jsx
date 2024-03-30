import styled from 'styled-components'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin: 20px;
`

const BlogCard = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

const BlogTitle = styled.h2`
  margin: 0 0 10px 0;
  font-size: 1.25rem;
`

const BlogAuthor = styled.p`
  margin: 0;
  font-style: italic;
`
const BlogUrl = styled.a`
  display: block;
  margin-top: 10px;
  color: #0077cc;
  font-size: 0.875rem;
  text-decoration: none;
`

export { GridContainer, BlogCard, BlogTitle, BlogAuthor, BlogUrl }