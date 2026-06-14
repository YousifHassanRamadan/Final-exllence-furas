import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// 🟢 Async Thunk for Posting Address
export const addAddress = createAsyncThunk(
  "user/addAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.ADD_USER_ADDRESS,
        addressData
      );

      return response.data; // ✅ Return API response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 🟢 User Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    isAddressAdded: true,
  },
  reducers: {
    resetIsisAddressAdded: (state) => {
      state.isAddressAdded = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.status = "loading";
        // console.log("state.status", state.status);
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log("state.status", state.status);
        state.isAddressAdded = false;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        // console.log("state.status", state.status);
        state.isAddressAdded = false;
      });
  },
});

export const { resetIsisAddressAdded } = userSlice.actions;

// 🟢 Export Reducer
export const addAddressState = userSlice.reducer;
