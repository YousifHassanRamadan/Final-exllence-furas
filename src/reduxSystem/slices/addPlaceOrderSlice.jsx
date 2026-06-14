import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// إنشاء thunk لإرسال الطلب
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.post(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.ADD_PLACE_ORDER,
        orderData
      );

      return response.data; // ✅ إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const placeOrderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
    status: "idle",
  },
  reducers: {}, // لا يوجد Reducer عادي، فقط Thunk
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
        // console.log("state.status", state.status);
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        // console.log("state.status", state.status);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
        // console.log("state.status", state.status);
      });
  },
});

export const placeOrderState = placeOrderSlice.reducer;
