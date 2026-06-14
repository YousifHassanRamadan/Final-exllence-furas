import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// دالة تحديث المنتج في السلة
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, variantId, quantity }, { rejectWithValue }) => {
    try {
      const bodyData = variantId
        ? { variantId, quantity }
        : { productId, quantity };

      // إرسال الطلب للتحديث باستخدام axios
      const response = await axiosClient.put(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.EDIT_CART_ITEM,
        bodyData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    isEdited: true,
  },
  reducers: {
    resetEditCartState: (state) => {
      state.isEdited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCartItem.pending, (state) => {
        state.status = "loading";
        // console.log("state.status", state.status);
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log("state.status", state.status);
        state.isEdited = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        // console.log("state.status", state.status);
        state.isEdited = false;
      });
  },
});

export const { resetEditCartState } = cartSlice.actions;

export const editCartState = cartSlice.reducer;
