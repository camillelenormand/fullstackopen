import axios from 'axios'
const baseUrl = '/api/blogs'

/**
 * Sets the authorization token.
 * @param {string} token The new token to be used for authorization.
 * @returns {void}
 * @throws {Error} If the token is not a string.
 */
const setToken = () => {
  let token = localStorage.getItem('loggedBlogUser')
  console.log('token', token)
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    console.log('token', token)
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

/**
 * Fetches all blogs.
 * @returns {Promise<Array>} A promise that resolves to the array of blogs.
 * @throws {Error} If the fetch operation fails.
 */
const getAllBlogs = async ({ page = 1, limit = 10}) => {
  try {
    const response = await axios.get(baseUrl, {
      params: { page, limit }
    })
    console.log('response', response.data)
    return response.data
  }
  catch (error) {
    console.error('Error fetching blogs', error)
    throw error 
  }
}

/**
 * Fetch a blog
 * @param {Object} blog
 * @returns {Promise<Object>} The blog post data.
 * @throws {Error} If the fetch operation fails.
 */

const getBlog = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`)
    console.log('response', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching blog', error)
    throw error
  }
}

/**
 * Creates a new blog post.
 * @param {Object} newBlog The blog post to create.
 * @returns {Promise<Object|null>} The created blog post data on success, or null on failure.
 * @throws {Error} If the create operation fails.
 */
const createBlog = async (newBlog, authToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    },
  }

  try {
    const response = await axios.post(baseUrl, newBlog, config)
    console.log('response', response.data)
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
 * @throws {Error} If the update operation fails.
 */
const updateBlog = async ({ id, newBlog, authToken }) => {
  console.log('newBlog', newBlog)
  const config = {
    headers: { 
      Authorization: `Bearer ${authToken}`
    }
  }
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newBlog, config)
    console.log('newBlog', newBlog)
    console.log('response', response.data.updatedBlog.likes)
    return response.data
  } catch (error) {
    console.error('Error updating blog', error)
    throw error // Ensure consistent error handling by rethrowing the error
  }
}

/**
 * Deletes a blog post.
 * @param {string} id The ID of the blog to delete.
 * @returns {Promise<Object>} The response data from the delete operation.
 * @throws {Error} If the delete operation fails.
 */
const deleteBlog = async ({ id, authToken }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    },
  }
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    console.log('response', response.data)
    console.log('id', id)
    console.log('Blog deleted successfully')
    return response.data
  } catch (error) {
    console.error('Error deleting blog', error)
    throw error // Ensure consistent error handling by rethrowing the error
  }
}

/**
 * Gets all comments for a blog post.
 * @param {string} id The ID of the blog post to get comments for.
 * @returns {Promise<Array>} An array of comments for the blog post.
 * @throws {Error} If the comments fetching fails.
*/

const getComments = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}/comments`)
    console.log('response', response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching comments', error)
    throw error
  }
}

/**
 * Creates a new comment for a blog post.
 * @param {string} id The ID of the blog post to create a comment for.
 * @param {Object} newComment The comment to create.
 * @returns {Promise<Object>} The created comment data.
 * @throws {Error} If the comment creation fails.
*/

const createComment = async (id, newComment) => {
  try {
    const response = await axios.post(`${baseUrl}/${id}/comments`, newComment)
    console.log('response', response.data)
    return response.data
  } catch (error) {
    console.error('Error creating comment', error)
    throw error
  }
}


export default { 
  setToken,
  getAllBlogs, 
  getBlog, 
  createBlog, 
  updateBlog, 
  deleteBlog, 
  getComments,
  createComment
}
