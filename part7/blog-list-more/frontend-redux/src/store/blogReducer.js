// src/store/blogReducer.js
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

export const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    isLoading: false,
  },
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    setLoading(state, action) {
      state.isLoading = action.payload
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    dispatch(setLoading(true))
    const blogs = await blogService.getAllBlogs()
    console.log('blogs', blogs)
    dispatch(setBlogs(blogs))
    dispatch(setLoading(false))
  }
}

export const { setBlogs, setLoading } = blogSlice.actions

export default blogSlice.reducer