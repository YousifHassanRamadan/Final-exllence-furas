import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// إنشاء thunk لجلب بيانات السلة مع استخدام التوكن من localStorage
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.get(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.GET_USER_CART
      );

      return response.data; // ✅ إرجاع البيانات
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "getCart",
  initialState: {
    userCart: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
    totalCartPrice: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        // console.log("state.status", state.status);
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userCart = action.payload.cart;
        state.totalCartPrice = action.payload.totalCartPrice;

        // console.log("action.payload", action.payload.cart);

        // console.log("state.status", state.status);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        // console.log("state.status", state.status);
      });
  },
});

export const getCartState = cartSlice.reducer;
