import React from "react";
import { useSelector } from "react-redux";

const Weather = () => {
  const weatherData = useSelector((state) => state.weather.weather);

  if (!weatherData) {
    return null;
  }

  const { location, current } = weatherData;

  return (
    <div className="weather-container">
      <h2 className="location">{location.name}</h2>
      <div className="weather-info">
        <img
          className="icon"
          src={current.condition.icon}
          alt={current.condition.text}
        />
        <div className="temperature">{current.temp_c}°C</div>
        <div className="details">
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

export default Weather;
