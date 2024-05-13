// AuthContext.js
import { createContext, useContext, useReducer } from 'react'
import loginService from '../services/login'
import storageService from '../services/storage'

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(reducer, null)

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const useLogin = () => {
  const { dispatch } = useAuth()
  return async (credentials) => {
    const user = await loginService.login(credentials)
    dispatch({ type: 'LOGIN', payload: user })
    storageService.saveUser(user)
  }
}

export const useLogout = () => {
  const { dispatch } = useAuth()
  return () => {
    dispatch({ type: 'LOGOUT' })
    storageService.removeUser()
  }
}

export const useUser = () => {
  const { dispatch } = useAuth()
  return async () => {
    const user = storageService.loadUser()
    if (user) {
      dispatch({
        type: 'LOGIN',
        payload: user
      })
    }
  }
}

export default AuthContext