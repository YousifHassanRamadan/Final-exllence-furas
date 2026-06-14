import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../common/constants";
import axiosClient from "../../services/axiosClient";

// ✅ تعريف Async Thunk لجلب جميع الطلبات
export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.get(
        API_ENDPOINTS.ADMIN_ENPOINTS.GET_ALL_ORDERS
      );

      return response.data; // ✅ إرجاع البيانات
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const allOrdersSlice = createSlice({
  name: "allOrders",
  initialState: {
    orders: [],
    loading: true,
    error: null,
    statue: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.error = null;
        state.statue = "loading";
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.statue = "success";
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.statue = "failed";
      });
  },
});

export const allOrdersState = allOrdersSlice.reducer;
