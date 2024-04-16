import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: ${props => props.theme.body};
    color: ${props => props.theme.text};
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    transition: all 0.25s linear;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }

  p {
    margin: 0;
    padding: 0;
  }
  `
export default GlobalStyle
