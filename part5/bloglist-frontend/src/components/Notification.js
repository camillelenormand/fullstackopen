import PropTypes from 'prop-types'

const notification = ({ message, color }) => {
  const style = {
    color: color,
    background: 'white',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontWeight: 'bold'
  }

  return (
    message ?
      <div className="notification" style={style}>{message}</div>
      :
      null
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string
}

export default notification