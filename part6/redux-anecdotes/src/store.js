import { configureStore } from '@reduxjs/toolkit'
import anecdoteFilterReducer from './reducers/anecdoteFilterReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import anecdoteNotificationReducer from './reducers/anecdoteNotificationReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: anecdoteFilterReducer,
    notification: anecdoteNotificationReducer
  }
})

export default store