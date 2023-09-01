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
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('')
  const [loginVisible, setLoginVisible] = useState(false) 

  const blogFormRef = useRef()

  // Get all blogs
  useEffect(() => {
    blogService.getAll().then(async blogs =>
      setBlogs(blogs)
    )  
  }, [])

  console.log(blogs)


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

    } 

    catch (error) {
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
const handleCreate = async ( blogObject ) => {
  try {
    console.log('Creating a new blog', blogObject.title, blogObject.author, blogObject.url)
    blogFormRef.current.toggleVisibility()
    
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setMessage(`A new blog ${blogObject.title} by ${blogObject.author} with url ${blogObject.url} added successfully`)
    setColor('green')
  } 
  catch (error) {
    setMessage('Failed to create a new blog')
    setColor('red')
  }

  // Notification timeout
  setTimeout(() => {
    setMessage(null)
  }, 5000)
}

  // Update a blog
  const handleUpdate = async ( blogObject ) => {
    console.log('Blog Object', blogObject)
    console.log('Updating a blog', blogObject.title, blogObject.author, blogObject.url)
    try {
      console.log('Updating a blog', blogObject.title, blogObject.author, blogObject.url, blogObject.id)
      blogFormRef.current.toggleVisibility()
      
      const returnedBlog = await blogService.update(blogObject.id, blogObject)
      console.log(returnedBlog)
      setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog))
      setMessage(`Blog ${blogObject.title} by ${blogObject.author} with url ${blogObject.url} updated successfully`)
      setColor('green')
    } 
    catch (error) {
      setMessage('Failed to update a blog')
      setColor('red')
    }
  }

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
                  createBlog={handleCreate}
                />
              </Togglable>
              <BlogList 
                key={blogs.id}
                blog={blogs} 
                updateBlog={handleUpdate}
              />
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