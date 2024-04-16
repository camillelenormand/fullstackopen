import HomePage from './pages/HomePage'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import {
  BrowserRouter as Router,
  Routes, 
  Route, 
} from 'react-router-dom'
import User from './components/User'
import Blog from './components/Blog'
import Header from './components/Header'
import BlogForm from './components/BlogForm'

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/blogs" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/users" element={<UserList/>} />
        <Route path="blogs/new" element={<BlogForm />} />
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
