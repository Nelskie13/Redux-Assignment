import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiKey = "a05c7c2a2aae40feb82131443230105";

export const fetchApiData = createAsyncThunk(
  "weather/fetchWeather",
  async (location) => {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  weather: null,
  isLoading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weather = action.payload;
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
