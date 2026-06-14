import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// Async Thunk to update the review
export const updateReview = createAsyncThunk(
  "review/updateReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.put(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.EDIT_REVIEW,
        reviewData
      );

      return response.data; // Returning the updated review data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    isEdited: true,
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateReview.pending, (state) => {
        state.error = null;
        state.status = "loading";
        // console.log("state.status", state.status);
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.isEdited = false;
        state.status = "success";
        // console.log("state.status", state.status);
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.isEdited = false;
        state.error = action.payload;
        state.status = "failed";
        // console.log("state.status", state.status);
      });
  },
});

export const reviewState = reviewSlice.reducer;
