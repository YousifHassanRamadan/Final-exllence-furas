import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// Async thunk to delete a user
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (targetUserId, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.delete(
        API_ENDPOINTS.ADMIN_ENPOINTS.DELETE_USER,
        {
          data: { targetUserId }, // إرسال البيانات في `data` عند استخدام DELETE
        }
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
    isUserDeleted: true,
    status: "idle",
    error: null,
  },
  reducers: {
    resetDeleteUserState: (state) => {
      state.isUserDeleted = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
        // console.log("state.status", state.status);
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isUserDeleted = false;
        state.status = "success";
        // console.log("state.status", state.status);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isUserDeleted = false;
        state.error = action.payload;
        state.status = "failed";
        // console.log("state.status", state.status);
      });
  },
});

export const { resetDeleteUserState } = adminSlice.actions;

export const deleteUserState = adminSlice.reducer;
