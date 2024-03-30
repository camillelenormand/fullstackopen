// AuthContext.js
import React, { createContext, useContext, useState } from 'react'
import { useMutation } from 'react-query'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ user: null, token: null })

  const { mutate: login, isLoading, isError, error } = useMutation(
    credentials => loginService(credentials),
    {
      onSuccess: (data) => {
        // Assuming the response data contains user info and token
        setAuthState({ user: data.user, token: data.token })
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(data))
      },
      onError: (error) => {
        setAuthState({ user: null, token: null })
        console.error('Failed to login: ', error)
      }
    }
  )

  const logout = () => {
    setAuthState({ user: null, token: null })
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, isError, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  )
}
