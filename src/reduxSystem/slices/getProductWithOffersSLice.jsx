import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

const initialState = {
  offerProducts: [],
  loading: true,
  error: null,
  status: "idle",
};

export const getOfferProducts = createAsyncThunk(
  "getOfferProducts",
  async (_, { rejectWithValue }) => {
    try {
      const endpoint = `${API_ENDPOINTS.CUSTOMER_ENDPOINTS.PRODUCTS_WITH_OFFER}`;
      const response = await axiosClient.get(endpoint);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const offerProductsSlice = createSlice({
  name: "offerProductsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOfferProducts.pending, (state) => {
      state.loading = true;
      state.status = "loading";
      // console.log("state.status", state.status);
    });
    builder.addCase(getOfferProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.offerProducts = action.payload.products;
      state.error = null;
      state.status = "success";
      // console.log("state.status", state.status);
    });
    builder.addCase(getOfferProducts.rejected, (state, action) => {
      state.loading = false;
      state.offerProducts = [];
      state.error = action.payload;
      state.status = "failed";
      // console.log("state.status", state.status);
    });
  },
});

export const offerProductsState = offerProductsSlice.reducer;
