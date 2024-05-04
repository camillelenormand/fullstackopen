// AuthContext.js
import { createContext, useContext, useState } from 'react'
import { useMutation } from 'react-query'
import loginService from '../services/login'
import { useNotify } from './NotificationContext'

const AuthContext = createContext()
const notifyWith = useNotify()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const token = JSON.parse(window.localStorage.getItem('loggedBlogToken'))
    const username = JSON.parse(window.localStorage.getItem('loggedBlogUsername'))
    return { username, token }
  })

  const loginMutation = useMutation(credentials => loginService(credentials), {
    onSuccess: (data) => {
      setAuthState({ username: data.username, token: data.token })
      window.localStorage.setItem('loggedBlogUsername', JSON.stringify(data.username))
      window.localStorage.setItem('loggedBlogToken', JSON.stringify(data.token))
    },
    onError: (error) => {
      setAuthState({ username: null, token: null })
      window.localStorage.removeItem('loggedBlogUsername')
      window.localStorage.removeItem('loggedBlogToken')
      notifyWith(error.response.data.error, 'error')
    },
  })

  const logout = () => {
    setAuthState({ username: null, token: null })
    window.localStorage.removeItem('loggedBlogUsername')
    window.localStorage.removeItem('loggedBlogToken')
    notifyWith('Logged out successfully', 'success')
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login: loginMutation.mutate,
        logout,
        isError: loginMutation.isError,
        isSuccess: loginMutation.isSuccess,
        isLoading: loginMutation.isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
