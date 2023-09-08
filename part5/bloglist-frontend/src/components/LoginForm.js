import React from 'react'
import PropTypes from 'prop-types'
const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin
}) => (
  <form onSubmit={handleLogin}>
    <div>
      <label> Username </label>
      <input
        id="username"
        type="text"
        value={username}
        name="username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      <label>Password</label>
      <input
        id="password"
        type="password"
        value={password}
        name="password"
        onChange={handlePasswordChange}
      />
    </div>
    <button id="login-button" type="submit">Login</button>
  </form>
)

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
