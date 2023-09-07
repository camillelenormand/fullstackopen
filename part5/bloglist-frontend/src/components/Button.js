import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ label, onClick, name, style, id }) => {
  return (
    <button
      id={id}
      type='button'
      onClick={onClick}
      className={name}
      style={style}
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string
}

export default Button