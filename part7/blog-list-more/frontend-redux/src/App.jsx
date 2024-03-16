import BlogList from "./components/BlogList"
import BlogForm from "./components/BlogForm"
import Heading from "./components/Title"
import LoginForm from "./components/LoginForm"
import { useSelector } from "react-redux"

const App = () => {
  const user = useSelector(state => state.login.user)

  return (  
    <div>
      {user === null ? <LoginForm /> : (
        <>
        <Heading text="My blog" />
        <LoginForm />
        <BlogForm />
        <BlogList />
        </>
      )}
  </div>
  )
}

export default App