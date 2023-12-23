// anecdoteNotificationReducer.js
import { createSlice } from '@reduxjs/toolkit'

const anecdoteNotificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      return action.payload
    }
  }
})

export const { showNotification } = anecdoteNotificationSlice.actions
export default anecdoteNotificationSlice.reducer