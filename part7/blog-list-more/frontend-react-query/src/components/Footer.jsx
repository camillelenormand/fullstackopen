import styled from 'styled-components'

const FooterContainer = styled.footer
`
  background-color: ${props => props.theme.footer};
  color: ${props => props.theme.text};
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: ${props => props.theme.footer};
  color: ${props => props.theme.textFooter};
  text-align: center;
  padding: 10px 0;        
`

const Footer = () => {
  return (
    <FooterContainer>
      <p>Blog app, Camille Lenormand 2024</p>
    </FooterContainer>
  )
}

export default Footer