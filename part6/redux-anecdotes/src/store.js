import { configureStore } from '@reduxjs/toolkit'
import anecdoteFilterReducer from './reducers/anecdoteFilterReducer'
import anecdoteReducer from './reducers/anecdoteReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: anecdoteFilterReducer
  }
})

export default store