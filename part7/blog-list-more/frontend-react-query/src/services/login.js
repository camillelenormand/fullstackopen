import axios from 'axios'
const baseUrl = '/api/login'

const loginService = async credentials => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  } catch (err) {
    console.error('Error logging in', err)
    throw err
  }
}

export default loginService
