// LogoutButton.js
import { useAuth } from '../contexts/AuthContext' 
import Button from './Button' 

const LogoutButton = () => {
  const { logout } = useAuth()

  return (
      <Button onClick={logout}>
        Logout
      </Button>
  )
}

export default LogoutButton