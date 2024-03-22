import { useDispatch, useSelector } from 'react-redux'
import { loginUser, setError, setLoading } from '../store/loginReducer'
import { useState } from 'react'
import styled from 'styled-components'

// Styled components
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`

const StyledLabel = styled.label`
  margin-bottom: 5px;
  margin-top: 10px;
`

const StyledInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const StyledButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`

const ErrorMsg = styled.p`
  color: red;
`

const LoginForm = () => {
  const dispatch = useDispatch()

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const error = useSelector((state) => state.login.error)
  const isLoading = useSelector((state) => state.login.isLoading)

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    })
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading && console.log('Loading...')
    dispatch(loginUser(credentials))

    if (!credentials.username.trim() || !credentials.password.trim()) {
      console.log('Username and password are required')
      dispatch(setError('Username and password are required'))
      return
    }
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>
          Username
        </StyledLabel>
        <StyledInput
          id="username"
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <StyledLabel>
          Password
        </StyledLabel>
        <StyledInput
          id="password"
          type="password"
          name="password"
          value={credentials.password}
          autoComplete='off'
          onChange={handleChange}
          required
        />
        <StyledButton id="login-button" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </StyledButton>
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </StyledForm>
    </>
  )
}

export default LoginForm
