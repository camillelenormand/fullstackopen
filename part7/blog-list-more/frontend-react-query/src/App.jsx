import HomePage from './pages/HomePage'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import {
  Routes, 
  Route, 
} from 'react-router-dom'
import User from './components/User'
import Blog from './components/Blog'
import Header from './components/Header'
import BlogForm from './components/BlogForm'
import Error from './components/Error'

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/blogs" element={<HomePage />} errorElement={<Error />} />
        <Route path="/login" element={<LoginForm />} errorElement={<Error />} />
        <Route path="/users" element={<UserList/>} errorElement={<Error />} />
        <Route path="blogs/new" element={<BlogForm />} errorElement={<Error />} />
        <Route path="/" element={<HomePage />} errorElement={<Error />} />
        <Route path="/users/:id" element={<User/>} errorElement={<Error />} />
        <Route path="/blogs/:id" element={<Blog/>} errorElement={<Error />} />
      </Routes>
      <footer>
        <p>Blog app April 2024</p>
      </footer>
    </div>
  )
}

export default App
