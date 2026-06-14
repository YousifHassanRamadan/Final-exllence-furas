import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      let endPoint = `${API_ENDPOINTS.CUSTOMER_ENDPOINTS.GET_SINGLE_PRODUCT}${id}`;
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.get(endPoint);

      return response.data; // ✅ إرجاع البيانات
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState: {
    product: null,
    isLoading: true,
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.error = null;
        state.status = "loading";
        // console.log("state.status", "Fetching product...");
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload.product;
        state.status = "success";
        // console.log("state.status", "Product fetched successfully");
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "failed";
        // console.error(
        //   "state.status",
        //   "Failed to fetch product:",
        //   action.payload
        // );
      });
  },
});

export const singleProductState = singleProductSlice.reducer;
