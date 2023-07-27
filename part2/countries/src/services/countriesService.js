import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getCountries = async () => {
  const request = axios.get(baseUrl)
  console.log("Request", request)
  const response = await request
  console.log("Response", response)
  return response.data
}


const countriesService = { getCountries }

export default countriesService