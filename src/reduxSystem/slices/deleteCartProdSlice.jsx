import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

const deleteApi = "http://localhost:3000/user/cart/delete-item";

// دالة حذف المنتج من السلة
export const deleteProductCart = createAsyncThunk(
  "cart/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.delete(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.DELETE_ITEM_CART,
        {
          data: { productId }, // إرسال productId في data
        }
      );

      return productId; // إرجاع الـ ID للحذف من الـ state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    status: "idle",
    error: null,
    isProdDeleted: true,
  },
  reducers: {
    resetisProdDeleted: (state) => {
      state.isProdDeleted = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProductCart.pending, (state) => {
        state.status = "loading";
        // console.log("state.status", state.status);
      })
      .addCase(deleteProductCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log("state.status", state.status);
        state.isProdDeleted = false;
      })
      .addCase(deleteProductCart.rejected, (state, action) => {
        state.status = "failed";
        // console.log("state.status", state.status);
        state.isProdDeleted = false;
        state.error = action.payload;
      });
  },
});

export const { resetisProdDeleted } = cartSlice.actions;

export const deleteProdCart = cartSlice.reducer;
