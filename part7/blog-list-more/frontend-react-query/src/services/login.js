import axios from 'axios'
const baseUrl = '/api/login'

const loginService = async credentials => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  } catch (err) {
    throw new Error(`Error logging in: ${err.response.data.error}`)
  }
}

export default loginService
