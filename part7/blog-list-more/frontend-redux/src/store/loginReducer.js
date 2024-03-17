// src/store/loginReducer.js
import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: '',
    isLoading: false,
    error: ''
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
  }
  }
})

export const login = (username, password) => {
  return async dispatch => {
    dispatch(setIsLoading(true))
    try {
      const user = await loginService.login(username, password)
      dispatch(setUser(user))
    }
    catch (error) {
      console.log('Error logging in: ', error)
    }
    finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const { setUser, setIsLoading, setError } = loginSlice.actions

export default loginSlice.reducer