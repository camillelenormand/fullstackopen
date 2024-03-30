import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { NotificationContextProvider } from '../contexts/NotificationContext'
import LoginForm from './LoginForm'
import BlogForm from './BlogForm'
import BlogList from './BlogList'

function AppContent() {
  const { user } = useContext(UserContext)

  return (
    <NotificationContextProvider>
      <div className="App">
        <header className="App-header">
          <h1>My Blog</h1>
          {!user ? (
            <LoginForm />
          ) : (
            <>
              <BlogForm />
              <BlogList />
            </>
          )}
        </header>
      </div>
    </NotificationContextProvider>
  )
}

export default AppContent