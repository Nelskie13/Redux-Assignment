import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// This is the API key that will be used to fetch suggested cities.
const apiKey = "a05c7c2a2aae40feb82131443230105";

// This function fetches suggested cities from the API.
export const fetchSuggestedCities = createAsyncThunk(
  "city/fetchSuggestedCities",
  async (location) => {
    // Make a request to the API.
    const response = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${location}`
    );

    // Parse the response data.
    const data = await response.json();
    return data;
  }
);

// This is the initial state of the slice.
const initialState = {
  cityName: null,
  suggestedCities: [],
  isLoading: false,
  error: null,
};

// This is the reducer for the slice.
const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    // This reducer sets the suggested cities state.
    setSuggestedCities: (state, action) => {
      state.suggestedCities = action.payload;
    },
  },
  extraReducers: (builder) => {
    // This case handles the `pending` action from the `fetchSuggestedCities` thunk.
    builder
      .addCase(fetchSuggestedCities.pending, (state) => {
        state.isLoading = true;
      })

      // This case handles the `fulfilled` action from the `fetchSuggestedCities` thunk.
      .addCase(fetchSuggestedCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suggestedCities = action.payload;
      })

      // This case handles the `rejected` action from the `fetchSuggestedCities` thunk.
      .addCase(fetchSuggestedCities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// This exports the `setSuggestedCities` action creator.
export const { setSuggestedCities } = citySlice.actions;

// This exports the reducer for the slice.
export default citySlice.reducer;
