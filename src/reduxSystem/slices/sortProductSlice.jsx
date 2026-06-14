import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minPrice: 0,
  maxPrice: 5000,
  sortBy: "default",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortBy } = filterSlice.actions;
export const sortState = filterSlice.reducer;
