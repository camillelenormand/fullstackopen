import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getCountry = async (country) => {
  const request = axios.get(baseUrl + country)
  console.log("Request", request)
  const response = await request
  console.log("Response", response)
  return response.data
}


const countriesService = { getCountry }

export default countriesService