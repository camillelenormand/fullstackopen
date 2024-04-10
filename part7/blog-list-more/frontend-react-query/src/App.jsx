import HomePage from './pages/HomePage'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import {
  BrowserRouter as Router,
  Routes, 
  Route, 
  Link, 
  Navigate, 
} from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import LogoutButton from './components/LogOutButton'
import User from './components/User'
import Blog from './components/Blog'
import { useNotify } from './contexts/NotificationContext'

function App() {
  const user = useAuth()
  const token = window.localStorage.getItem('loggedBlogToken')
  const notify = useNotify()

  user ? console.log('user:', user) :
  notify('Please log in to view blogs', 'info')

  return (
    <div className="App">
      <header className="App-header">
        <Notification />
        <div>
          <Link to="/blogs">Blogs</Link>
          <Link to="/users">Users</Link>
          {
          !token ? <Link to="/login">Login</Link>  : <LogoutButton /> 
          }
        </div>
      </header>
      <Routes>
        <Route path="/blogs" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={user === null ? <Navigate replace to="/login" /> : <UserList/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/users/:id" element={<User/>} />
        <Route path="/blogs/:id" element={<Blog/>} />
      </Routes>
      <footer>
        <p>Blog app April 2024</p>
      </footer>
    </div>
  )
}

export default App
