import { useDispatch, useSelector } from 'react-redux'
import { hideNotification } from '../reducers/anecdoteNotificationReducer'
import { useEffect } from 'react'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    if (notification.visibility) {
      // Add a method to scroll to the notification 
      window.scrollTo(0, 0)

      // set timeout to make the notification disappear after 3500s
      const timer = setTimeout(() => {
        dispatch(hideNotification())
      }, 3500)

      return () => clearTimeout(timer)
    }
  }, [notification.visibility, dispatch])

  if (!notification.visibility) {
    return null
  }

  return notification ? (
    <p className="notice">
       {notification.message}
    </p>
  ) : null
}

export default Notification