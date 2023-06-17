import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiKey = "a05c7c2a2aae40feb82131443230105";

export const fetchSuggestedCities = createAsyncThunk(
  "city/fetchSuggestedCities",
  async (location) => {
    const response = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${location}`
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  cityName: null,
  suggestedCities: [],
  isLoading: false,
  error: null,
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setSuggestedCities: (state, action) => {
      state.suggestedCities = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestedCities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSuggestedCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suggestedCities = action.payload;
      })
      .addCase(fetchSuggestedCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const { setSuggestedCities } = citySlice.actions;
export default citySlice.reducer;
