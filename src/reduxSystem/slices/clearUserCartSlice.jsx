import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.delete(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.DELETE_USER_CART
      );

      return response.data; // ✅ إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isCartCleared: true,
    statue: "idle",
    error: null,
  },
  reducers: {
    resetIsCartCleared: (state) => {
      state.isCartCleared = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clearCart.pending, (state) => {
        state.error = null;
        state.statue = "loading";
        // console.log("state.statue", state.statue);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.isCartCleared = false;
        state.statue = "success";
        // console.log("state.statue", state.statue);
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload;
        state.isCartCleared = false;
        state.statue = "failed";
        // console.log("state.statue", state.statue);
      });
  },
});

export const { resetIsCartCleared } = cartSlice.actions;

export const clearCartState = cartSlice.reducer;
