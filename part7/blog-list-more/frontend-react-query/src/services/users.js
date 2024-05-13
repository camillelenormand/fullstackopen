import axios from 'axios'
const baseUrl = '/api/users'

/**
 * Fetches all users.
 * @returns {Promise<Array>} A promise that resolves to the array of users.
 */

const getAllUsers = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.error('Error fetching users', error)
    throw new Error(error.response.data.error || 'An error occurred')
  }
}

const getUser = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user', error)
    throw new Error(error.response.data.error || 'An error occurred')
  }
}

const getLoggedInUser = async () => {
  try {
    const response = await axios.get(`${baseUrl}/me`)
    return response.data
  } catch (error) {
    console.error('Error fetching logged in user', error)
    throw new Error(error.response.data.error || 'An error occurred')
  }
}

export default { getAllUsers, getUser, getLoggedInUser }