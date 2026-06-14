import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

const initialState = {
  Allproducts: [],
  loading: true,
  error: null,
  status: "idle",
};

export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async ({ category = "", search = "" } = {}, { rejectWithValue }) => {
    try {
      let endpoint = `${API_ENDPOINTS.CUSTOMER_ENDPOINTS.GET_PRODUCTS}?sort=true`;

      if (category) endpoint += `&category=${category}`;
      if (search) endpoint += `&search=${search}`;

      // إرسال الطلب باستخدام axios
      const response = await axiosClient.get(endpoint);

      return response.data; // ✅ إرجاع البيانات
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
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
      state.status = "loading";
      // console.log("state.status", state.status);
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.Allproducts = action.payload.products;
      state.error = null;
      state.status = "success";
      // console.log("state.status", state.status);
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.Allproducts = []; // ✅ تصفير المنتجات عند حدوث خطأ
      state.error = action.payload;
      state.status = "failed";
      // console.log("state.error", state.error);
      // console.log("state.status", state.status);
    });
  },
});

export const allProductsState = getAllProductsSlice.reducer;
