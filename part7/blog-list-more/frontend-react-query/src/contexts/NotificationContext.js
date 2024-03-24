// NotificationContext.js
import { createContext, useContext } from 'react'

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const { notification } = useContext(NotificationContext)
  return notification
}

export const useNotify = () => {
  const { dispatch } = useContext(NotificationContext)
  return (payload) => {
    dispatch({ type: 'SET_NOTIFICATION', data: payload })
    setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
  }
}

export default NotificationContext
