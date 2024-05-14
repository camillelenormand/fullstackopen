import styled from "styled-components"

const ErrorContainer = styled.div`
  color: red;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 10px;
  text-align: center;
`

const ErrorMessage = styled.p`
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 10px;
  text-align: center;
`

const Error = ({ error }) => {
  return (
    <ErrorContainer>
      <ErrorMessage> {error.message} </ErrorMessage>
    </ErrorContainer>
  )
}

export default Error