import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

export const getAllBlogs = createAsyncThunk(
  'blogs/getAllBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await blogService.getAllBlogs()
      console.log('response.data', response)
      return response
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

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

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (id, { rejectWithValue }) => {
    try {
      await blogService.deleteBlog(id)
      console.log('response.data', id)
      return id
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async (object, { rejectWithValue }) => {
    try {
      const response = await blogService.updateBlog(object.id, object)
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
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false
        state.blogs = action.payload
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
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
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true
        state.error = null
        console.log('deleteBlog.pending')
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false
        // Remove the deleted blog from the blogs array
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
        console.log('deleteBlog.fulfilled')
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        console.log('deleteBlog.rejected')
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = null
        const index = state.blogs.findIndex(blog => blog.id === action.payload.id);
        if (index !== -1) {
          state.blogs[index] = action.payload; // Update the blog with the new data
        }
        console.log('state.blogs', state.blogs)
        console.log('updateBlog.fulfilled')
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})


export const { setBlogs, setLoading, setError } = blogSlice.actions

export default blogSlice.reducer
