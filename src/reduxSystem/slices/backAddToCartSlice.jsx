import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// Async Thunk to add products to cart
export const addToCartApi = createAsyncThunk(
  "cart/addToCartApi",
  async (products, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.post(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.ADD_TO_CART,
        { products }
      );

      return response.data; // إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cartAPI",
  initialState: {
    status: "idle",
    error: null,
    isProductAdded: true,
  },
  reducers: {
    resetisProductAdded: (state) => {
      state.isProductAdded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartApi.pending, (state) => {
        state.status = "loading";
        // console.log("state.status", state.status);
      })
      .addCase(addToCartApi.fulfilled, (state) => {
        state.status = "succeeded";
        state.isProductAdded = false;
        // console.log("state.status", state.status);
      })
      .addCase(addToCartApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isProductAdded = false;
        // console.log("state.status", state.status);
      });
  },
});

export const { resetisProductAdded } = cartSlice.actions;

export const AddToCartState = cartSlice.reducer;
