import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";
// API endpoint

// Async thunk to remove admin role from a user
export const removeUserAsAdmin = createAsyncThunk(
  "admin/removeUserAsAdmin",
  async (targetUserId, { rejectWithValue }) => {
    try {
      // Sending the request using axios
      const response = await axiosClient.put(
        API_ENDPOINTS.ADMIN_ENPOINTS.REMOVE_ADMIN,
        { targetUserId }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice definition
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isRemoveAdmin: true,
    status: "idle",
    error: null,
  },
  reducers: {
    removedIsRemoveAdmin: (state) => {
      state.isRemoveAdmin = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeUserAsAdmin.pending, (state) => {
        state.status = "loading";
        // console.log("state.status", state.status);
        state.error = null;
      })
      .addCase(removeUserAsAdmin.fulfilled, (state) => {
        state.isRemoveAdmin = false;
        state.status = "success";
        // console.log("state.status", state.status);
      })
      .addCase(removeUserAsAdmin.rejected, (state, action) => {
        state.isRemoveAdmin = false;
        state.error = action.payload;
        state.status = "failed";
        // console.log("state.status", state.status);
      });
  },
});

export const { removedIsRemoveAdmin } = adminSlice.actions;

export const removeAdminState = adminSlice.reducer;
