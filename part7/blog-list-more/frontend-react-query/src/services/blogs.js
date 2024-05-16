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
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
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
    return response.data
  }
  catch (error) {
    throw new Error(`Error fetching blogs: ${error.message}`)
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
    return response.data
  } catch (error) {
    throw new Error(`Error fetching blog: ${error.message}`)
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
    return response.data
  } catch (error) {
    throw new Error(`Error creating blog: ${error.message}`)
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
    return response.data
  } catch (error) {
    throw new Error(`Error updating blog: ${error.message}`)
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
    console.log('Blog deleted successfully')
    return response.data
  } catch (error) {
    throw new Error(`Error deleting blog: ${error.message}`)
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
    return response.data
  } catch (error) {
    console.error('Error fetching comments', error)
    throw new Error(`Error fetching comments: ${error.message}`)
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
    return response.data
  } catch (error) {
    console.error('Error creating comment', error)
    throw new Error(`Error creating comment: ${error.message}`)
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
