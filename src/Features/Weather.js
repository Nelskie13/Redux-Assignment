import React from "react";
import { useSelector } from "react-redux";

// This component renders a weather forecast.
const Weather = () => {
  // The `useSelector` hook gets the current weather data from the Redux store.
  const weatherData = useSelector((state) => state.weather.weather);

  // If there is no weather data, return null.
  if (!weatherData) {
    return null;
  }

  // The `location` and `current` properties contain the current weather information.
  const { location, current } = weatherData;

  // The `weather-container` div contains the main weather information.
  return (
    <div className="weather-container">
      <h2 className="location">
        {location.name}, {location.country}
      </h2>
      <div className="weather-info">
        <img
          className="icon"
          src={current.condition.icon}
          alt={current.condition.text}
        />
        <div className="temperature">{current.temp_c}°C</div>
        <div className="details">
          <div className="feelslike">Feels like: {current.feelslike_c}°C</div>
          <div>Humidity: {current.humidity}%</div>
          <div>Condition: {current.condition.text}</div>
          <div>Wind: {current.wind_kph} km/h</div>
          <div>Pressure: {current.pressure_mb} mb</div>
          <div>Visibilty: {current.vis_km} km</div>
          <div>Cloud: {current.cloud}%</div>
        </div>
      </div>
    </div>
  );
};

// This exports the Weather component.
export default Weather;
