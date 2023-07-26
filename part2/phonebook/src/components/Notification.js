import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, color }) => {
  const messageStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: color
  }
  if (!message) {
    return null
  }
  return (
    <div>
      <p style={messageStyle}>{message} </p>
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string.isRequired
}

export default Notification