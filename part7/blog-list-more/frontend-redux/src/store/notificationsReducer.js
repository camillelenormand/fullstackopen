// src/store/notificationsReducer.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification: {
    message: '',
    visible: false,
    timeout: 5000,
    type: 'info'
  },
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
      showNotification(state, action) {
        state.notification.message = action.payload.message
        state.notification.visible = true
        state.notification.timeout = action.payload.timeout || 5000
        state.notification.type = action.payload.type || 'success'
      },
      hideNotification(state) {
        state.notification.message = ''
        state.notification.visible = false
      }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const displayNotification = (message, timeout = 5000, type = 'info') => {
  return (dispatch) => {
    dispatch(showNotification({ message, timeout, type }))

    setTimeout(() => {
      dispatch(hideNotification())
    }, timeout)
  }
}

export default notificationSlice.reducer

