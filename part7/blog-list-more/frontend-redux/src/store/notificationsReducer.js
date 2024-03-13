// src/store/notificationsReducer.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notifications: [],
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload)
    },
    clearNotifications: (state) => {
      state.notifications = []
    }
  }
})

export const {addNotification, clearNotifications} = notificationSlice.actions

export const addErrorNotification = (message) => addNotification({ type: 'error', message })
export const addSuccessNotification = (message) => addNotification({ type: 'success', message })
export const addWarningNotification = (message) => addNotification({ type: 'warning', message })

export default notificationSlice.reducer

