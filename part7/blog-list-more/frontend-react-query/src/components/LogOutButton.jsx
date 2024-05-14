// LogoutButton.js
import { useLogout } from '../contexts/AuthContext'
import { useNotify } from '../contexts/NotificationContext'
import storageService from '../services/storage'
import Button from './Button' 

const LogoutButton = () => {
  const logout = useLogout()
  const notify = useNotify()

  const handleLogout = () => {
    logout()
    notify('Logout successful', 'success')
    storageService.removeUser()
  }

  return (
      <Button onClick={handleLogout}>
        Logout
      </Button>
  )
}

export default LogoutButton