import { useSelector } from 'react-redux'
import styled from 'styled-components'


const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`

const NotificationMessage = styled.div`
  background-color: ${({ type }) => {
    switch (type) {
      case 'error':
        return '#f44336'; // Red for errors
      case 'success':
        return '#4CAF50'; // Green for success
      default:
        return '#2196F3'; // Blue as a default color
    }
  }};
  color: #721c24;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`


const Notification = () => {
  const notification = useSelector((state) => state.notifications.notification)
  console.log('notification:', notification)
  console.log('notification.visible:', notification.visible)
  console.log('notification.message:', notification.message)
  console.log('notification.type:', notification.type)

  if (notification.visible === false || !notification.message) {
    return null
  }

  return (
    <NotificationContainer>
      <NotificationMessage type={notification.type}>
        {notification.message}
      </NotificationMessage>
    </NotificationContainer>
  )
}

export default Notification