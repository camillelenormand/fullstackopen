import BlogList from "./components/BlogList"
import BlogForm from "./components/BlogForm"
import Heading from "./components/Title"
import LoginForm from "./components/LoginForm"
import { useSelector } from "react-redux"

const App = () => {
  const user = useSelector(state => state.login.username)
  console.log('user', user)

  if (!user) {
    return (
      <>
        <Heading text="Log in to application" />
        <LoginForm />
      </>
    )
  }

    return (
      <>
        <Heading text="Blogs" />
        <BlogForm />
        <BlogList />
      </>
    )
  }

export default App
