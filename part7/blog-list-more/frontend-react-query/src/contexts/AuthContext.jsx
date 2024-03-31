// AuthContext.js
import React, { createContext, useContext, useState } from 'react'
import { useMutation } from 'react-query'
import loginService  from '../services/login'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ username: null, token: null })

  const { mutate: login, isLoading, isError, error } = useMutation(
    credentials => loginService(credentials),
    {
      onMutate: () => {
        isError(false)
        isLoading(true)
      },
      onSuccess: (data) => {
        // Assuming the response data contains user info and token
        setAuthState({ username: data.username, token: data.token })
        isLoading(false)
        isError(false)
        // setIsAuthenticated(true)
        window.localStorage.setItem('loggedBlogUsername', JSON.stringify(data.username))
        window.localStorage.setItem('loggedBlogToken', JSON.stringify(data.token))
        console.log('Logged in successfully', data)
        console.log('User:', data.username)
        console.log('Token:', data.token)
        console.log('local username', window.localStorage.getItem('loggedBlogUsername'))
        console.log('local token', window.localStorage.getItem('loggedBlogToken'))
      },
      onError: (error) => {
        setAuthState({ username: null, token: null })
        isLoading(false)
        // setIsAuthenticated(false)
        isError(true)
        console.error('Failed to login: ', error)
      }
    }
  )

  const logout = () => {
    setAuthState({ username: null, token: null })
    // setIsAuthenticated(false)
    window.localStorage.removeItem('loggedBlogUsername')
    window.localStorage.removeItem('loggedBlogToken')
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, isError, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  )
}
