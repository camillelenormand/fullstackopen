import React, { useState, useEffect } from "react"
import weatherService from "../services/weatherService"
import Image from "./Image"
import Title from "./Title"

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    weatherService
      .getWeather(city)
      .then(response => {
        setWeather(response)
      })
      .catch(error => {
        setError(error.message)
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
  }, [city])

  // Check if weather data is available
  const isWeatherDataAvailable = !!weather.weather && Array.isArray(weather.weather)

  return (
    <div>
      <Title label={city} size="h3" />
      {error && <p>Error: {error}</p>}
      {isWeatherDataAvailable ? (
        <ul>
          <li>Sum-up: {weather?.weather[0]?.description} </li>
          <li>Temperature: {weather?.main?.temp}°F</li>
          <li>Humidity: {weather?.main?.humidity}%</li>
          <li>Wind: {weather?.wind?.speed} m/s</li>
          <li>Pressure: {weather?.main?.pressure} hPa</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      {isWeatherDataAvailable && (
        <Image src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} width='100' height='100'/>
      )}
       <hr />
    </div>
  )
}

export default Weather
