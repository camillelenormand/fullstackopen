import HomePage from './pages/HomePage'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import {
  BrowserRouter as Router,
  Routes, 
  Route, 
  Navigate, 
} from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import User from './components/User'
import Blog from './components/Blog'
import Header from './components/Header'
import { useNotify } from './contexts/NotificationContext'

function App() {
  const user = useAuth()
  const notify = useNotify()

  user ? console.log('user:', user) :
  notify('Please log in to view blogs', 'info')

  return (
    <div className="App">
      <Header />
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
