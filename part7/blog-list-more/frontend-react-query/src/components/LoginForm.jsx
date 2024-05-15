import { useNavigate } from 'react-router-dom'
import Button from './Button'
import styled from 'styled-components'
import { useLogin } from '../contexts/AuthContext'
import { useNotify } from '../contexts/NotificationContext'
import { useField } from '../hooks/useField'

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  width: 300px;
  margin: 0 auto;
`
const LoginTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 10px;
  text-align: center;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
`

const LoginForm = () => {
  const navigate = useNavigate()
  const {
    value: usernameValue,
    onChange: usernameOnChange,
    reset: resetUsername
  } = useField('text')
  const { 
    value: passwordValue, 
    onChange: passwordOnChange, 
    reset: resetPassword 
  } = useField('password')

  const doLogin = useLogin()
  const notify = useNotify()

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('Form submitted')

    try {
      console.log('Attempting to log in...')
      await doLogin({
        username: usernameValue.trim(),
        password: passwordValue.trim()
      })

      console.log('Login successful')

      notify('Login successful', 'success')
      navigate('/blogs')
      resetUsername()
      resetPassword()

    } catch (error) {
      console.log('Login failed', error)
      resetUsername()
      resetPassword()
      notify('Invalid username or password', 'error')
    }
  }

  return (
    <LoginFormContainer>
      <LoginTitle>
        Log in
      </LoginTitle>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <input
            id="username"
            type="text"
            name="username"
            placeholder='username'
            required
            autoComplete='username'
            value={usernameValue}
            onChange={usernameOnChange}
            aria-label='username'
          />
        </InputContainer>
        <InputContainer>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete='current-password'
            placeholder='password'
            required
            value={passwordValue}
            onChange={passwordOnChange}
            aria-label='password'
          />
        </InputContainer>
        <Button type="submit">
          Login
        </Button>
      </form>
    </LoginFormContainer>
  )
}

export default LoginForm