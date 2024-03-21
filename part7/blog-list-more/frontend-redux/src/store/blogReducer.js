import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async (object, { rejectWithValue }) => {
    try {
      const response = await blogService.createBlog(object)
      console.log('response.data', response)
      return response
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    isLoading: false,
    error: null
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setBlogs: (state, action) => {
      state.blogs = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false
        // Append the new blog to the blogs array instead of replacing `data`
        state.blogs = [...state.blogs, action.payload]
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    dispatch(setLoading(true))
    try {
      const blogs = await blogService.getAllBlogs()
      dispatch(setBlogs(blogs))
      console.log('blogs', blogs)
    } catch (error) {
      console.error('Error initializing blogs', error)
      dispatch(setError('Error initializing blogs'))
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const { setBlogs, setLoading, setError } = blogSlice.actions

export default blogSlice.reducer
