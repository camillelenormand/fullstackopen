// anecdoteNotificationReducer.js
import { createSlice } from '@reduxjs/toolkit'

const anecdoteNotificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    visibility: false,
    timeout: 5000
  },
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message,
      state.visibility = true,
      state.timeout = action.payload.timeout || 5000
    },
    hideNotification(state) {
      state.message ='',
      state.visibility = false
    }
  }
})

export const { setNotification, hideNotification } = anecdoteNotificationSlice.actions

export const displayNotification = (message, duration) => {
  return dispatch => {
    dispatch(setNotification({ message }))

    setTimeout(() => {
      dispatch(hideNotification())
    }, duration * 1000)
  }
}

export default anecdoteNotificationSlice.reducer