import React from "react";
import { useSelector } from "react-redux";

const Weather = () => {
  const weatherData = useSelector((state) => state.weather.weather);

  if (!weatherData) {
    return null;
  }

  const { location, current } = weatherData;

  return (
    <div>
      <h2>{location.name}</h2>
      <img src={current.condition.icon} alt={current.condition.text} />
      <p>Temperature: {current.temp_c}°C</p>
      <p>Humidity: {current.humidity}%</p>
      <p>Condition: {current.condition.text}</p>
      <p>Wind: {current.wind_kph} km/h</p>
      <p>Pressure: {current.pressure_mb} mb</p>
      <p>Visibilty: {current.vis_km} km</p>
      <p>Cloud: {current.cloud}%</p>
    </div>
  );
};

export default Weather;
