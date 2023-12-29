import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    if (notification.visibility) {
      // Add a method to scroll to the notification 
      window.scrollTo(0, 0)
    }
  })

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