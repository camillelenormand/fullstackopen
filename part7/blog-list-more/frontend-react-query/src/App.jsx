import './App.css'
import HomePage from './components/HomePage'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useAuth } from './contexts/AuthContext'
import LoginForm from './components/LoginForm'

function App() {
  const user = useAuth()
  console.log('user:', user)

  return (
        <NotificationContextProvider>
          <div className="App">
            <header className="App-header">
              <h1>My Blog</h1>
            </header>
            {!user ? <LoginForm /> : <HomePage />}
          </div>
        </NotificationContextProvider>
  )
}

export default App
