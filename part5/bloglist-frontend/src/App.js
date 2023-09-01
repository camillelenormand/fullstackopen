import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import UserInfo from './components/UserInfo'
import Button from './components/Button'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)  

  // Get all blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  // Check if user is logged
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    } 

    else {
      setUser(null)
      window.localStorage.removeItem('loggedBlogUser')
    }
  }, [])

  // Log in
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  
    try {
      const user = await loginService({
        username, password
      })
      // save the user to local storage
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      console.log(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
      setMessage('Logged in successfully')
      setColor('green')
      setLoginVisible(false)

    } catch (exception) {
      setMessage('Wrong username or password')
      setColor('red')
    }
  
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  
  // Log out
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  // Create a new blog
  const handleCreate = (blogObject) => {
    console.log('creating a new blog', title, author, url)
    
    blogService
      .create({ blogObject })
      console.log(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`A new blog ${title} by ${author} added`)
        setColor('green')
      })
      .catch(error => {
        setMessage(error.response.data.error)
        setColor('red')
      })

    // Notification timeout
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  // Pass ref to BlogForm
  const blogFormRef = useRef()

    return (
      <div>  
        <h2>Blogs</h2>
        <Notification message={message} color={color}/>
        {
          user === null 
          ? <Togglable 
              buttonLabel='Sign in'
              visible={loginVisible}>
            <LoginForm 
              username={username} 
              password={password} 
              handlePasswordChange={(e) => setPassword(e.target.value)} 
              handleUsernameChange={(e) => setUsername(e.target.value)} 
              handleLogin={handleLogin} 
            />
            </Togglable>
          : 
            <>
              <UserInfo user={user} />
              <Togglable 
                buttonLabel='Create New Blog'
                ref={blogFormRef} 
              >
                <BlogForm 
                  handleCreate={handleCreate} 
                  title={title} 
                  setTitle={setTitle} 
                  author={author} 
                  setAuthor={setAuthor} 
                  url={url} 
                  setUrl={setUrl}
                />
              </Togglable>
              <BlogList 
                blogs={blogs} />
              <Button 
                label='Sign out' 
                onClick={handleLogout}
              />
            </> 
          }
        </div>
      )
    }

export default App