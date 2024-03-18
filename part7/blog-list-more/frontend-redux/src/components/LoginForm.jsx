import { useDispatch, useSelector } from 'react-redux'
import { loginUser, setError } from '../store/loginReducer'
import { useState } from 'react'

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const error = useSelector((state) => state.login.error)
  const isLoading = useSelector((state) => state.login.isLoading)
  const dispatch = useDispatch()

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
    dispatch(loginUser(credentials))
    console.log('credentials', credentials)
    console.log('error', error)
    console.log('isLoading', isLoading)
    console.log('username', credentials.username) 

    if (!credentials.username.trim() || !credentials.password.trim()) {
      console.log('Username and password are required')
      dispatch(setError('Username and password are required'))
      return
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <label>
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={credentials.password}
          autoComplete='off'
          onChange={handleChange}
          required
        />
        <button id="login-button" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  )
}

export default LoginForm
