import axios from 'axios'
const baseUrl = '/api/login'

const loginService = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  console.log('response', response)
  return response.data
}


export default loginService