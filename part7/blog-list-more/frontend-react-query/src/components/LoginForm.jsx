import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'

import { useNotify } from '../contexts/NotificationContext'

const LoginForm = () => {
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
      await login(credentials)
      notifyWith('Logged in successfully')
      setCredentials({ username: '', password: '' })

    } catch (error) {
      console.error('Failed to login: ', error)
      notify('Failed to login', error.response?.data?.message || 'Please try again.')
    }
  }

  return (
    <div>
      <h2>Log in </h2>
      <form onSubmit={handleSubmit} disabled={isLoading}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={credentials.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
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