import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "./WeatherSlice";
import cityReducer from "./CitySlice";

const rootReducer = combineReducers({
  weather: weatherReducer,
  city: cityReducer,
});

export default rootReducer;
