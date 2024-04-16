// Button.jsx
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: ${props => props.theme.secondaryColor};
  color: ${props => props.theme.text};
  border: 2px solid ${props => props.theme.toggleBorder};

  &:hover {
      background-color: ${props => props.theme.secondaryColor};
  }
`

const Button = ({ onClick, children, className = '', ...props }) => {
  return (
    <StyledButton onClick={onClick} className={`btn ${className}`} {...props}>
      {children}
    </StyledButton>
  )
}

export default Button