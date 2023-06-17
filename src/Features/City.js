import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData } from "./WeatherSlice";
import { fetchSuggestedCities } from "./CitySlice";

const City = () => {
  const [cityName, setCityName] = useState("");
  const dispatch = useDispatch();
  const suggestedCities = useSelector((state) => state.city.suggestedCities);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchApiData(cityName));
    setCityName("");
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setCityName(inputValue);
    dispatch(fetchSuggestedCities(inputValue));
  };

  const handleSuggestedCityClick = (cityName) => {
    setCityName(cityName); // update the input field with the selected city
    dispatch(fetchApiData(cityName));
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="title">Weather App</h1>
      <label>
        <input
          type="text"
          value={cityName}
          onChange={handleInputChange}
          className="input"
          placeholder="Enter City Name"
        />
      </label>
      <button type="submit" className="button">
        Get Weather Data
      </button>

      {suggestedCities.length > 0 && (
        <ul className="suggested-cities">
          {suggestedCities.map((city) => (
            <li
              key={city.name}
              onClick={() => handleSuggestedCityClick(city.name)}
              className="suggested-city"
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default City;
