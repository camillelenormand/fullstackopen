// src/store/loginReducer.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import loginService from '../services/login'

const initialState = {
  user: '',
  token: '',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: '',
  isLoading: false,
  isLoggedIn: false
}

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (userData) => {
    const response = await loginService(userData)
    return response    
  })

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.isLoggedIn = true
    },
    setLoggedOut: (state) => {
      state.user = null,
      state.token = null,
      state.status = 'idle',
      state.error = '',
      state.isLoading = false,
      state.isLoggedIn = false;
      localStorage.removeItem('loggedBlogUser')
    }, 
    setError: (state, action) => {
      state.error = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = 'loading'
        state.isLoading = true
        console.log('loginUser.pending', action.payload)
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.username = action.payload.username
        state.token = action.payload.token
        state.isLoading = false
        console.log('loginUser.fulfilled', action.payload)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        state.isLoading = false
        console.log('loginUser.rejected', action.error.message)
      })
  }
})

export const { setLoggedIn, setLoggedOut, setError, setLoading } = loginSlice.actions

export default loginSlice.reducer