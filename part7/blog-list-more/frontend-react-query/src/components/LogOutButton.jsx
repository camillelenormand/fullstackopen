// LogoutButton.js
import { useAuth } from '../contexts/AuthContext' // Adjust the import path as needed
import Button from './Button' // Adjust the import path as needed

const LogoutButton = () => {
  const { logout } = useAuth()

  return (
    <Button onClick={logout}>
      Logout
    </Button>
  )
}

export default LogoutButton