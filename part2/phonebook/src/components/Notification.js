import React from 'react'

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

export default Notification