import React from 'react'
import PropTypes from 'prop-types'


const PersonForm = ({ handleSubmit, newName, newPhoneNumber, handleChangePhoneNumber, handleChangeName }) => {

  return(
    <div>
      <h3>New Contact</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input 
              required
              value={newName}
              onChange={handleChangeName}
            />
          </div>
          <div>
            <label>Phone</label>
            <input 
              required
              value={newPhoneNumber}
              onChange={handleChangePhoneNumber}
            />
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
    </div>
  )
}

PersonForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  newName: PropTypes.string.isRequired,
  newPhoneNumber: PropTypes.string.isRequired,
  handleChangePhoneNumber: PropTypes.func.isRequired,
  handleChangeName: PropTypes.func.isRequired
}

export default PersonForm
