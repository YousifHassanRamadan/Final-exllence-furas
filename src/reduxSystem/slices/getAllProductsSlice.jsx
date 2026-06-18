import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

const initialState = {
  Allproducts: [],
  loading: true,
  error: null,
  status: "idle",
  totalPages: 1,
  currentPage: 1,
  totalProducts: 0,
};

export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async (
    { category = "", search = "", page = 1, limit = 10 } = {},
    { rejectWithValue },
  ) => {
    try {
      let endpoint = `${API_ENDPOINTS.CUSTOMER_ENDPOINTS.GET_PRODUCTS}?sort=true&page=${page}&limit=${limit}`;

      if (category) endpoint += `&category=${encodeURIComponent(category)}`;
      if (search) endpoint += `&search=${encodeURIComponent(search)}`;

      const response = await axiosClient.get(endpoint);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const getAllProductsSlice = createSlice({
  name: "getAllProductsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
      state.status = "loading";
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.Allproducts = action.payload.products;
      state.totalPages = action.payload.totalPages || 1;
      state.currentPage = action.payload.currentPage || 1;
      state.totalProducts = action.payload.totalProducts || 0;
      state.error = null;
      state.status = "success";
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.Allproducts = [];
      state.totalPages = 1;
      state.totalProducts = 0;
      state.error = action.payload;
      state.status = "failed";
    });
  },
});

export const allProductsState = getAllProductsSlice.reducer;
