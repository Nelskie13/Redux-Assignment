import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// This is the API key that will be used to fetch weather data.
const apiKey = "a05c7c2a2aae40feb82131443230105";

// This function fetches weather data from the API.
export const fetchApiData = createAsyncThunk(
  "weather/fetchWeather",
  async (location) => {
    // Make a request to the API.
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`
    );

    // Parse the response data.
    const data = await response.json();
    return data;
  }
);

// This is the initial state of the slice.
const initialState = {
  weather: null,
  isLoading: false,
  error: null,
};

// This is the reducer for the slice.
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // This case handles the `pending` action from the `fetchApiData` thunk.
    builder.addCase(fetchApiData.pending, (state) => {
      state.isLoading = true;
    });

    // This case handles the `fulfilled` action from the `fetchApiData` thunk.
    builder.addCase(fetchApiData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.weather = action.payload;
    });

    // This case handles the `rejected` action from the `fetchApiData` thunk.
    builder.addCase(fetchApiData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

// This is the exported reducer for the slice.
export default weatherSlice.reducer;
