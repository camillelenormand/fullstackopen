// src/store/blogReducer.js
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

export const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    isLoading: false
  },
  reducers: {
    isLoading(state, action) {
      state.isLoading = action.payload
    },
    setBlogs(state, action) {
      state.blogs = action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    dispatch(isLoading(true))
    const blogs = await blogService.getAllBlogs()
    console.log('blogs', blogs)
    dispatch(setBlogs(blogs))
    console.log('blogs', blogs)
    dispatch(isLoading(false))
  }
}

export const createBlog = (object) => {
  return async dispatch => {
    const blog = await blogService.createBlog(object)
    console.log('newBlog', blog)
    dispatch(addBlog(blog))
  }
}

export const { setBlogs, addBlog, isLoading } = blogSlice.actions

export default blogSlice.reducer