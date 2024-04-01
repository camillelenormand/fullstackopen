import './App.css'
import HomePage from './components/HomePage'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

function App() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>My Blog</h1>
          <Notification />
        </header>
        <LoginForm />
        <HomePage />
      </div>
    )
  }

export default App
