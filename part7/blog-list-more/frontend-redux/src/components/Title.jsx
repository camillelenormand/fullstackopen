import styled from 'styled-components'

const StyledTitle = styled.h1`
  font-family: 'Roboto', sans-serif;
  color: #000000;
  text-align: center;
  padding: 16px;
`

const Title = ({ text, size }) => {
  return (
    <StyledTitle>{text}</StyledTitle>
  )
}


export default Title