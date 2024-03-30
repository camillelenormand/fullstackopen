import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

export const useNotify = () => {
  const { dispatch } = useContext(NotificationContext)
  return (payload) => {
    dispatch({ type: 'SET_NOTIFICATION', data: payload })
    setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
  }
}