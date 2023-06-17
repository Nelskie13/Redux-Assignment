import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "./WeatherSlice";

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export default rootReducer;
