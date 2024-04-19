import styled from 'styled-components'

const BlogFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`

const BlogFormTitle = styled.h2`
  margin: 0 0 10px 0;
  font-size: 1.25rem;
`

const BlogFormInput = styled.input`
  margin: 0 0 10px 0;
  padding: 5px;
  width: 50%;
`

const BlogFormLabel = styled.label`
  flex-direction: column;
  text-align: left;
  display: block;
  color: #333;
  margin: 0 0 5px 0;
  font-size: 1rem;
`

const BlogLikes = styled.span`
  margin: 0 0 10px 0;
  padding: 5px;
  width: 100%;
`

const BlogButton = styled.button`
 ${props => props.theme.button}
 width: 10%;
`

export { BlogFormContainer, BlogFormTitle, BlogFormInput, BlogButton, BlogFormLabel, BlogLikes }