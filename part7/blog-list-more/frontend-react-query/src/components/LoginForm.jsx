import { useNotify } from '../hooks/useNotify'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'

const LoginForm = () => {
  const { login, isLoading, isError, error } = useAuth()
  const notify = useNotify()
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    login(credentials)
    notify('Logged in successfully')
  }

  return (
    <div>
      <h2>Log in </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          Login
        </button>
        {isError && useNotify('Failed to login', error.response?.data?.message) || 'Please try again.'}
      </form>
    </div>
  )
}

export default LoginForm