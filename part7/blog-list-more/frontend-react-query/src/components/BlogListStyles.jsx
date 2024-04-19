import styled from 'styled-components'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin: 20px;
`

const BlogCardDiv = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

`
const BlogTitle = styled.h2`
  ${props => props.theme.h2}
`

const BlogAuthor = styled.p`
  ${props => props.theme.p}
  font-style: italic;
`
const BlogUrl = styled.a`
  display: block;
  margin-top: 10px;
  color: #0077cc;
  font-size: 0.875rem;
  text-decoration: none;
`

export { GridContainer, BlogCardDiv, BlogTitle, BlogAuthor, BlogUrl }