import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData } from "./WeatherSlice";
import { fetchSuggestedCities } from "./CitySlice";
import { setSuggestedCities } from "./CitySlice";

const City = () => {
  // The `useState` hook creates two state variables: `cityName` and `setCityName`.
  // The `cityName` state variable stores the user's input for the city name.
  // The `setCityName` state variable is a function that updates the `cityName` state variable.
  const [cityName, setCityName] = useState("");
  // The `useSelector` hook gets the suggested cities from the Redux store.
  const dispatch = useDispatch();
  // The `useSelector` hook gets the suggested cities from the Redux store.
  const suggestedCities = useSelector((state) => state.city.suggestedCities);

  // This function handles the `submit` event of the form.
  const handleSubmit = (event) => {
    // Prevent the default behavior of the form.
    event.preventDefault();

    // If the city name is empty, do nothing.
    if (!cityName) {
      return;
    }
    // Dispatch an action to fetch the weather data for the city name.
    dispatch(fetchApiData(cityName));
    // Clear the city name input field.
    setCityName("");
  };
  // This function handles the `change` event of the city name input field.
  const handleInputChange = (event) => {
    // Get the new value of the input field.
    const inputValue = event.target.value;

    // Set the city name state to the new value.
    setCityName(inputValue);

    // Dispatch an action to fetch suggested cities for the new value.
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
