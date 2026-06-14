import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// API endpoint
const banUserApi = "http://localhost:3000/admin/ban-user";

// Async thunk to ban or unban a user
export const banOrUnbanUser = createAsyncThunk(
  "admin/banOrUnbanUser",
  async ({ targetUserId, isBanned }, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.put(
        API_ENDPOINTS.ADMIN_ENPOINTS.EDIT_BAN_USER,
        { targetUserId, isBanned }
      );

      return response.data; // Returning the response data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice definition
const banUserSlice = createSlice({
  name: "banUser",
  initialState: {
    isBanned: true,
    status: "idle",
    error: null,
  },
  reducers: {
    resetBanState: (state) => {
      state.isBanned = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(banOrUnbanUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
        // console.log("state.status", state.status);
      })
      .addCase(banOrUnbanUser.fulfilled, (state) => {
        state.status = "success";
        state.isBanned = false;
        // console.log("state.status", state.status);
      })
      .addCase(banOrUnbanUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
        state.isBanned = false;
        // console.log("state.status", state.status);
      });
  },
});

export const { resetBanState } = banUserSlice.actions;

export const banUserState = banUserSlice.reducer;
