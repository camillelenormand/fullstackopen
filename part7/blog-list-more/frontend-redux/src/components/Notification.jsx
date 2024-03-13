import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotifications } from '../store/notificationReducer'
import { useEffect } from 'react'
import styled from 'styled-components'

// styled components

const StyledNotification = styled.div`
  margin-bottom: 10px;
`

const NotificationMessage = styled.span`
  color: ${(props) => {
    switch (props.type) {
      case 'error':
        return 'red';
      case 'success':
        return 'green';
      case 'warning':
        return 'orange';
      default:
        return 'black';
    }
  }};
  background: white;
  font-size: 20px;
  border-style: solid;
  border-radius: 10px;
  padding: 10px;
  font-weight: bold;
`
const CloseButton = styled.button`
  margin-left: 10px;
`

const Notification = () => {
  const message = useSelector((state) => state.notification.message)
  const dispatch = useDispatch()

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearNotifications())
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [dispatch, message])

  const handleClose = () => {
    dispatch(clearNotifications)
  }

  return (
    <div>
     {message.map((notification, index) => (
        <StyledNotification key={index}>
          <NotificationMessage type={notification.type}>
            {notification.message}
          </NotificationMessage>
          <CloseButton onClick={handleClose}>x</CloseButton>
        </StyledNotification>
      ))}
    </div>
  )
}


Notification.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['error', 'success', 'warning']).isRequired
    })
  )
}

export default Notification