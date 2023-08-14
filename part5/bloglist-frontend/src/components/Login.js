
const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => (
    <form onSubmit={handleLogin}>
      <div>
        <label> Username </label>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label> Password </label>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Sign in</button>
    </form>
  )

  export default LoginForm
