import BlogList from "./components/BlogList"
import BlogForm from "./components/BlogForm"
import Heading from "./components/Title"
import LoginForm from "./components/LoginForm"
import { useSelector } from "react-redux"
import Notification from "./components/Notification"

const App = () => {
  const token = useSelector(state => state.login.token)
  const user = useSelector(state => state.login.user) 
  console.log('User:', user)  

  if (!token) {
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
