import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

export const fetchUserAddress = createAsyncThunk(
  "address/fetchUserAddress",
  async (_, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.get(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.GET_USER_ADDRESSES
      );

      return response.data; // ✅ إرجاع البيانات
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    userAddress: null,
    status: "idle",
    error: null,
    isAddress: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAddress.pending, (state) => {
        state.status = "loading";
        state.error = null;
        // console.log("state.status", state.status);
      })
      .addCase(fetchUserAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAddress = false;
        state.userAddress = action.payload.addresses;
        // console.log("state.status", state.status);
      })
      .addCase(fetchUserAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isAddress = false;
        // console.log("state.status", state.status);
      });
  },
});

export const userAddressState = addressSlice.reducer;
