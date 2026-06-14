import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minPrice: 0,
  maxPrice: 10000,
};

const priceFilterSlice = createSlice({
  name: "priceFilter",
  initialState,
  reducers: {
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    resetPriceFilter: (state) => {
      state.minPrice = 0;
      state.maxPrice = 10000;
    },
  },
});

export const { setMinPrice, setMaxPrice, resetPriceFilter } =
  priceFilterSlice.actions;
export const priceFilterState = priceFilterSlice.reducer;
