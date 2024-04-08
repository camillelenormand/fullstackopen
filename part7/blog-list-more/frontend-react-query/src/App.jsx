import './App.css'
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

function App() {
  const user = useAuth()
  console.log('user:', user)

  return (
    <div className="App">
      <header className="App-header">
        <Notification />
        <div>
          <Link to="/blogs">Blogs</Link>
          <Link to="/users">Users</Link>
          {
          user.username === null 
            ? <Link to="/login">Login</Link> 
            : `${user.username} logged in` &&
            <LogoutButton />
          }
        </div>
      </header>
      <Routes>
        <Route path="/blogs" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={user.username === null ? <Navigate replace to="/login" /> : <UserList/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/users/:id" element={<User/>} />
      </Routes>
      <footer>
        <p>Blog app April 2024</p>
      </footer>
    </div>
  )
}

export default App
