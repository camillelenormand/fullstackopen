
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
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label> Password </label>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Sign in</button>
    </form>
  )

  export default LoginForm
