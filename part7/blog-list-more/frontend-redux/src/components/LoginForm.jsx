import { useDispatch, useSelector } from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login.user)
  const isLoading = useSelector(state => state.login.isLoading)
  const error = useSelector(state => state.login.error)

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedUser = { ...user, [name]: value}
    dispatch(updatedUser)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging, user: ', user)
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <label>
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          onChange={handleChange}
        />
        <label>
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          autoComplete='off'
          onChange={handleChange}
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
