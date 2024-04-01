import styled from 'styled-components'

const BlogFormContainer = styled.form`
  margin: 20px;
`

const BlogFormTitle = styled.h2`
  margin: 0 0 10px 0;
  font-size: 1.25rem;
`

const BlogFormInput = styled.input`
  margin: 0 0 10px 0;
  padding: 5px;
  width: 100%;
`

const BlogFormLabel = styled.label`
  flex-direction: column;
  text-align: left;
  display: block;
  color: #333;
  margin: 0 0 5px 0;
  font-size: 1rem;
`

const BlogFormButton = styled.button`
  margin: 10px 0 0 0;
  padding: 5px;
  width: 100%;
`

const BlogLikes = styled.span`
  margin: 0 0 10px 0;
  padding: 5px;
  width: 100%;
`

export { BlogFormContainer, BlogFormTitle, BlogFormInput, BlogFormButton, BlogFormLabel, BlogLikes }