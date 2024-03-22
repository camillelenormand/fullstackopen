import BlogList from "./components/BlogList"
import BlogForm from "./components/BlogForm"
import Heading from "./components/Title"
import LoginForm from "./components/LoginForm"
import { useSelector } from "react-redux"
import Notification from "./components/Notification"

const App = () => {
  const user = useSelector(state => state.login.username)

  if (!user) {
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
