import axios from "axios"
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

const api_key = process.env.REACT_APP_WEATHER_API_KEY
console.log("api_key", api_key)

const getWeather = async (city) => {
  const request = axios.get(baseUrl + city + '&appid=' + api_key)
  console.log("Request", request)
  const response = await request
  return response.data
}

const weatherService = { getWeather } 

export default weatherService