import BlogList from "./components/BlogList"
import BlogForm from "./components/BlogForm"
import Heading from "./components/Title"
import LoginForm from "./components/LoginForm"
import { useSelector } from "react-redux"
import Notification from "./components/Notification"
import { jwtDecode } from 'jwt-decode'

const App = () => {

  const isTokenExpired = () => {
    try {
      const decodedToken = jwtDecode(token)
      const currentTime = Date.now() / 1000
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Failed to decode token", error);
      return true; // If the token can't be decoded, treat it as expired.
    }
  }

  const token = useSelector(state => state.login.token)

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('loggedBlogUser')

    return (
      <>
        <Heading text="My blog app" />
        <LoginForm />
      </>
    )
  }

  return (
    <>
      <Heading text="My blog app" />
      <Notification />
      <BlogForm />
      <BlogList />
    </>
  )
}

export default App
