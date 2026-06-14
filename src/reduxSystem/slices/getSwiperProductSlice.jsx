import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// تعديل الـ initialState لتخزين المنتجات لكل فئة
const initialState = {};

export const getAllSwiperProducts = createAsyncThunk(
  "getSwiperProducts",
  async ({ category = "", search = "" } = {}, { rejectWithValue }) => {
    try {
      let endpoint = `${API_ENDPOINTS.CUSTOMER_ENDPOINTS.GET_PRODUCTS}?sort=true`;

      if (category) endpoint += `&category=${category}`;
      if (search) endpoint += `&search=${search}`;

      // إرسال الطلب باستخدام axios
      const response = await axiosClient.get(endpoint);

      return { category, products: response.data }; // إرجاع البيانات مع الـ category
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const getAllProductsSlice = createSlice({
  name: "getAllProductsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSwiperProducts.pending, (state) => {
      state.loading = true;
      state.status = "loading";
    });
    builder.addCase(getAllSwiperProducts.fulfilled, (state, action) => {
      const { category, products } = action.payload;

      state[category] = {
        // تخزين المنتجات لكل فئة
        products: products.products,
        loading: false,
        error: null,
        status: "success",
      };
    });
    builder.addCase(getAllSwiperProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.status = "failed";
    });
  },
});

export const allSwiperProductsState = getAllProductsSlice.reducer;
