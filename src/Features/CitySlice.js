import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  suggestedCities: [],
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSuggestedCities: (state, action) => {
      state.suggestedCities = action.payload;
    },
  },
});

export const { setName, setSuggestedCities } = citySlice.actions;

export default citySlice.reducer;
