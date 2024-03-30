// NotificationContext.js
import { createContext, useReducer, useMemo } from 'react'
// Optional: import PropTypes from 'prop-types'

const NotificationContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(reducer, null)
  const contextValue = useMemo(() => ({ notification, dispatch }), [notification])

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
