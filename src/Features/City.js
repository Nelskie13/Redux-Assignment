import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchApiData } from "./WeatherSlice";

const City = () => {
  const [cityName, setCityName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchApiData(cityName));
    setCityName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter City Name:
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
      </label>
      <button type="submit">Get Weather Data</button>
    </form>
  );
};

export default City;
