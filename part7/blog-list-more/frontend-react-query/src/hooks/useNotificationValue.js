import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext' 

export const useNotificationValue = () => {
  const { notification } = useContext(NotificationContext)
  return notification
}
