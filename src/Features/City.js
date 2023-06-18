import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData } from "./WeatherSlice";
import { fetchSuggestedCities } from "./CitySlice";
import { setSuggestedCities } from "./CitySlice";

const City = () => {
  const [cityName, setCityName] = useState("");
  const dispatch = useDispatch();
  const suggestedCities = useSelector((state) => state.city.suggestedCities);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!cityName) {
      return; // do nothing if cityName is empty
    }
    dispatch(fetchApiData(cityName));
    setCityName("");
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setCityName(inputValue);
    dispatch(fetchSuggestedCities(inputValue));
  };

  const handleSuggestedCityClick = (cityName) => {
    // filter the suggestedCities array to include only the selected city
    const filteredCities = suggestedCities.filter(
      (city) => city.name === cityName
    );

    // update the input field with the selected city
    setCityName(cityName);

    // update the suggestedCities state variable with the filtered array
    dispatch(fetchSuggestedCities(cityName));
    dispatch(setSuggestedCities(filteredCities));
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
          required
        />
      </label>
      <button type="submit" className="button">
        Get Weather Data
      </button>

      {suggestedCities.length > 0 && (
        <ul className="suggested-cities">
          {suggestedCities.map((city, id) => (
            <li
              key={city.name + id}
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
