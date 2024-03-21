// src/store/notificationsReducer.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notification: {
    message: '',
    visible: false,
    timeout: 5000,
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
      },
      hideNotification(state) {
        state.notification.message = ''
        state.notification.visible = false
      }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const displayNotification = (message, timeout = 5000) => {
  return (dispatch) => {
    dispatch(showNotification({ message, timeout }))

    setTimeout(() => {
      dispatch(hideNotification())
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer

