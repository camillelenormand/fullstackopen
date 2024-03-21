import { useSelector } from 'react-redux'
import styled from 'styled-components'


const StyledNotification = styled.div`
  border: 1px solid;
  padding: 10px;
  margin-bottom: 10px;
  color: green;
`

const Notification = () => {
  const notification = useSelector((state) => state.notifications.notification)
  console.log('notification:', notification)
  console.log('notification.visible:', notification.visible)
  console.log('notification.message:', notification.message)
  
  if (notification.visible === false || !notification.message) {
    return null
  }

  return (
     <StyledNotification type={notification.type}>
      {notification.message}
    </StyledNotification>
  )
}

export default Notification