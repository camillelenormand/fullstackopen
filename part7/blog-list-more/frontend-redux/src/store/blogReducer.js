import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
  name: 'blogs',
  initialState: { blogs: [], isLoading: false, error: null },
  reducers: {
    updateBlog(state, action) {
      const updatedBlog = action.payload
      const index = state.blogs.findIndex(blog => blog.id === updatedBlog.id)
      if (index !== -1) {
        state.blogs[index] = updatedBlog
      }
    },
    appendBlog(state, action) {
      state.blogs.push(action.payload)
    },
    setBlogs(state, action) {
      state.blogs = action.payload
    },
    setLoading(state, action) {
      state.isLoading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    }
  }
})

export const { appendBlog, setBlogs, updateBlog, setLoading, setError } = blogSlice.actions

// Async thunk actions
export const initializeBlogs = () => async dispatch => {
  dispatch(setLoading(true))
  try {
    const blogs = await blogService.getAllBlogs()
    dispatch(setBlogs(blogs))
  } catch (error) {
    dispatch(setError(error.response.data))
  } finally {
    dispatch(setLoading(false))
  }
}

export const createBlog = blogData => async dispatch => {
  dispatch(setLoading(true))
  try {
    const newBlog = await blogService.createBlog(blogData)
    dispatch(appendBlog(newBlog))
  } catch (error) {
    dispatch(setError(error.response.data))
  } finally {
    dispatch(setLoading(false))
  }
}

export const deleteBlog = id => async (dispatch, getState) => {
  try {
    await blogService.deleteBlog(id)
    const updatedBlogs = getState().blogs.blogs.filter(blog => blog.id !== id)
    dispatch(setBlogs(updatedBlogs))
  } catch (error) {
    dispatch(setError(error.response.data))
  }
}

export const likeBlog = id => async (dispatch, getState) => {
  try {
    const blogToLike = getState().blogs.blogs.find(blog => blog.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 }
    const updatedBlog = await blogService.updateBlog(id, likedBlog)
    dispatch(updateBlog(updatedBlog))
  } catch (error) {
    dispatch(setError(error.response.data))
  }
}

export default blogSlice.reducer
