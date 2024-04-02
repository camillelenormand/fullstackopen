import './App.css'
import HomePage from './components/HomePage'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

function App() {
  const user = window.localStorage.getItem('loggedBlogUsername')
  console.log('user:', user)

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Blog</h1>
        <Notification />
      </header>
      {!!user ?
        <HomePage />
        :
        <LoginForm />
      }
    </div>
  )
}

export default App
