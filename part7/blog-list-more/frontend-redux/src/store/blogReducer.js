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
      return { ...state, blogs: action.payload }  // This is the same as state.blogs = action.payload
    },
    setLoading(state, action) {
      return { ...state, isLoading: action.payload } // This is the same as state.isLoading = action.payload
    },
    addBlog(state, action) {
      state.blogs.push(action.payload)
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

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(blog)
    dispatch(createBlog(newBlog))
  }
}

export const { setBlogs, setLoading, addBlog } = blogSlice.actions

export default blogSlice.reducer