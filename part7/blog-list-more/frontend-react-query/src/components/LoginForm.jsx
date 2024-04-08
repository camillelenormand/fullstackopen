import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotify } from '../contexts/NotificationContext'

const LoginForm = () => {
  const navigate = useNavigate()
  const { login, isLoading } = useAuth()
  const notifyWith = useNotify()
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isLoading) {
      console.log('Loading...')
      return
    }
    try {
      const trimmedCredentials = {
        username: credentials.username.trim(),
        password: credentials.password.trim(),
      }
      await login(trimmedCredentials)
      notifyWith('Logged in successfully')
      setCredentials({ username: '', password: '' })
      navigate('/blogs')
      console.log('Logged in successfully')

    } catch (error) {
      console.error('Failed to login: ', error)
      notify('Failed to login', error.response?.data?.message || 'Please try again.')
      console.log('Failed to login: ', error)
    }
  }

  return (
    <div>
      <h2>Log in </h2>
      <form onSubmit={handleSubmit} disabled={isLoading}>
        <div>
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
        </div>
        <div>
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
        </div>
        <button type="submit" disabled={isLoading}>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm