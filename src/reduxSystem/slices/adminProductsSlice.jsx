import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

const initialState = {
  Allproducts: [],
  productLoading: false,
  error: null,
  totalPages: 0,
};

export const getAdminProducts = createAsyncThunk(
  "getAdminProducts",
  async ({ category = "", page = 1 }, { rejectWithValue }) => {
    try {
      let endPoint = `${API_ENDPOINTS.ADMIN_ENPOINTS.GET_ADMIN_PRODUCTS}?`;

      if (category) endPoint += `category=${category}`;

      if (page) {
        // إضافة & فقط إذا كان هناك بارامترات سابقة
        endPoint += `${category ? "&" : ""}page=${page}`;
      }

      const response = await axiosClient.get(endPoint);
      return { page, response: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const adminProductsSlice = createSlice({
  name: "adminProductsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAdminProducts.pending, (state) => {
      state.productLoading = true;
    });
    builder.addCase(getAdminProducts.fulfilled, (state, action) => {
      const { page, response } = action.payload;
      state.productLoading = false;
      state.Allproducts = response.products;
      state.error = null;
      state.totalPages = response.totalPages;

      // console.log("page", page);

      // console.log("action.payload.products", response.products);
      // console.log("action.payload.products", response.totalPages);
    });
    builder.addCase(getAdminProducts.rejected, (state, action) => {
      state.productLoading = false;
      state.error = action.payload;
    });
  },
});

export const adminProductsState = adminProductsSlice.reducer;
