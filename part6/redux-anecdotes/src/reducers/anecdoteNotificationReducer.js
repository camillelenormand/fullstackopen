// anecdoteNotificationReducer.js
import { createSlice } from '@reduxjs/toolkit'

const anecdoteNotificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    visibility: false
  },
  reducers: {
    showNotification(state, action) {
      state.message = action.payload
      state.visibility = true
    },
    hideNotification(state) {
      state.message ='',
      state.visibility = false
    }
  }
})

export const { showNotification, hideNotification } = anecdoteNotificationSlice.actions
export default anecdoteNotificationSlice.reducer