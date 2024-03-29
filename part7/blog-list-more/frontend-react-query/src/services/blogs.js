import axios from 'axios'
const baseUrl = '/api/blogs'

/**
 * Sets the authorization token.
 * @param {string} token The new token to be used for authorization.
 */
const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

/**
 * Fetches all blogs.
 * @returns {Promise<Array>} A promise that resolves to the array of blogs.
 */
const getAllBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

/**
 * Creates a new blog post.
 * @param {Object} newBlog The blog post to create.
 * @returns {Promise<Object|null>} The created blog post data on success, or null on failure.
 */
const createBlog = async (newBlog) => {
  try {
    const response = await axios.post(baseUrl, newBlog)
    return response.data
  } catch (error) {
    console.error('Error creating blog', error)
    throw error
  }
}

/**
 * Updates an existing blog post.
 * @param {string} id The ID of the blog to update.
 * @param {Object} newBlog The updated blog data.
 * @returns {Promise<Object>} The updated blog post data.
 */
const updateBlog = async (id, newBlog) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newBlog)
    return response.data
  } catch (error) {
    console.error('Error updating blog', error)
    throw error
  }
}

/**
 * Deletes a blog post.
 * @param {string} id The ID of the blog to delete.
 * @returns {Promise<Object>} The response data from the delete operation.
 */
const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting blog', error)
    throw error
  }
}

export default { getAllBlogs, createBlog, setToken, updateBlog, deleteBlog }
