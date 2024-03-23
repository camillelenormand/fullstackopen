// src/store/loginReducer.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import loginService from '../services/login'
import safeLocalStorage from '../utils/safeLocalStorage'

const initialState = {
  user: null || safeLocalStorage.getItem('loggedBlogUser'),
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: '',
  isLoading: false,
  token: safeLocalStorage.getItem('loggedBlogUser') || null,
  isLoggedIn: !!safeLocalStorage.getItem('loggedBlogUser')
}

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginService(userData)
      safeLocalStorage.setItem('loggedBlogUser', response.token) // store token in local storage
      safeLocalStorage.setItem('loggedBlogUserName', response.user) // store user in local storage
      return response
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    setLoggedOut: (state) => {
      state.user = null,
        state.token = null,
        state.status = 'idle',
        state.error = '',
        state.isLoading = false,
        state.isLoggedIn = false;
        safeLocalStorage.removeItem('loggedBlogUser')
        safeLocalStorage.removeItem('loggedBlogUserToken')
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
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.isLoading = false
        state.isLoggedIn = true
        state.token = action.payload.token // store token in state
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Login failed'
        state.isLoading = false
      })
  }
})

export const { setLoggedOut, setError, setLoading } = loginSlice.actions

export default loginSlice.reducer