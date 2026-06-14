import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// Async thunk to set user as admin
export const setUserAsAdmin = createAsyncThunk(
  "admin/setUserAsAdmin",
  async (targetUserId, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.put(
        API_ENDPOINTS.ADMIN_ENPOINTS.ADD_ADMIN,
        { targetUserId }
      );

      return response.data; // Returning the response data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice definition
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isAdminEdited: true,
    status: "idle",
    error: null,
  },
  reducers: {
    resetIsAdminEdited: (state) => {
      state.isAdminEdited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUserAsAdmin.pending, (state) => {
        state.success = false;
        state.error = null;
        state.status = "loading";
        // console.log("state.status", state.status);
      })
      .addCase(setUserAsAdmin.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.status = "success";
        // console.log("state.status", state.status);
      })
      .addCase(setUserAsAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
        state.status = "failed";
        // console.log("state.status", state.status);
      });
  },
});

export const { resetIsAdminEdited } = adminSlice.actions;

export const setAdminState = adminSlice.reducer;
