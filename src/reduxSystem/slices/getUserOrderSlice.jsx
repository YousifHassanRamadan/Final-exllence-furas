import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// ✅ تعريف Async Thunk لجلب الطلبات
export const getUserOrders = createAsyncThunk(
  "orders/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.get(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.GET_USER_ORDERS
      );

      return response.data; // ✅ إرجاع البيانات
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.error = null;
        console.log("Fetching user orders...");
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders; // ✅ تحديث الطلبات في الـ state
        console.log("User orders fetched successfully:", action.payload.orders);
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("Failed to fetch user orders:", action.payload);
      });
  },
});

export const ordersUserState = ordersSlice.reducer;
