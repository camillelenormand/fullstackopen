import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/Login'
import loginService from './services/login'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import UserInfo from './components/UserInfo'
import Button from './components/Button'
import BlogForm from './components/BlogForm'

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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  
    try {
      const user = await loginService({
        username, password
      })
  
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      console.log(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
  
      setMessage('Logged in successfully')
      setColor('green')
    } catch (exception) {
      setMessage('Wrong username or password')
      setColor('red')
    }
  
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    console.log('creating a new blog', title, author, url)
  
    try {
      const blog = await blogService.create({ title, author, url })
      console.log(blog)
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
  
      setMessage(`Blog created with success! ${blog.title} by ${blog.author}`)
      setColor('green')
    } catch (exception) {
      setMessage('Error when creating a new blog')
      setColor('red')
    }
  
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  

  return (
    <div>  
      <h2>Blogs</h2>
      <Notification message={message} color={color}/>
      {
        user === null 
          ? <LoginForm 
            username={username} 
            password={password} 
            setUsername={setUsername} 
            setPassword={setPassword} 
            handleLogin={handleLogin} 
            />
          : 
            <>
              <UserInfo user={user} />
              <BlogForm 
                handleCreate={handleCreate} 
                title={title} 
                setTitle={setTitle} 
                author={author} 
                setAuthor={setAuthor} 
                url={url} 
                setUrl={setUrl} />
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