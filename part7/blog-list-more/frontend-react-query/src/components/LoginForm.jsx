import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import styled from 'styled-components'
import Loading from './Loading'

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
  const { login, isLoading, isSuccess, isError } = useAuth()
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const trimmedCredentials = {
      username: credentials.username.trim(),
      password: credentials.password.trim(),
    }

    await login(trimmedCredentials)

    if (isLoading) {
      <Loading />
    }

    if (isError) {
      console.log(isError)
      setCredentials({ username: '', password: '' })
    }

    if (isSuccess) {
      setCredentials({ username: '', password: '' })
      navigate('/blogs')
    }
  }

  return (
    <LoginFormContainer>
      <LoginTitle>Log in </LoginTitle>
      <form onSubmit={handleSubmit} disabled={isLoading}>
        <InputContainer>
          <input
            type="text"
            id="username"
            name="username"
            placeholder='username'
            required
            autoComplete='username'
            value={credentials.username}
            onChange={handleChange}
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
            value={credentials.password}
            onChange={handleChange}
          />
        </InputContainer>
        <Button type="submit" disabled={isLoading}>
          Login
        </Button>
      </form>
    </LoginFormContainer>
  )
}

export default LoginForm