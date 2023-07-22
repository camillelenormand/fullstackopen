import React from 'react'

const PersonForm = ({ handleSubmit, newName, newPhoneNumber, handleChangePhoneNumber, handleChangeName }) => {

  return(
    <div>
      <h3>New Contact</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input 
              value={newName}
              onChange={handleChangeName}
            />
          </div>
          <div>
            <label>Phone</label>
            <input 
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

export default PersonForm
