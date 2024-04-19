import { useNotificationValue } from "../contexts/NotificationContext"
import styled, {css} from 'styled-components'

const NotificationContainer = styled.div`
  padding: 20px;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  margin: 20px 0;
  ${props => props.type === 'success' ? css`
  background: #d4edda; /* Light green background */
  border-color: #c3e6cb; /* Green border */
` : css`
  background: #f8d7da; /* Light red background */
  border-color: #f5c6cb; /* Red border */
`}
`
const NotificationContent = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
`

const Notification = () => {
  const notification = useNotificationValue() 

  if (!notification) return null

  return (
    <NotificationContainer type={notification.type}>
      <NotificationContent>
        {notification.message}
      </NotificationContent>
    </NotificationContainer>
  )
}

export default Notification