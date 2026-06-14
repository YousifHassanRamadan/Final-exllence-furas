import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// تعريف thunk لحذف المراجعة
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.delete(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.DELETE_REVIEW,
        {
          data: { reviewId }, // إرسال reviewId في data
        }
      );

      return reviewId; // نعيد ID المراجعة المحذوفة فقط
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// إنشاء Slice
const deleteReviewSlice = createSlice({
  name: "deleteReview",
  initialState: { isRevDeleted: true, error: null, status: "idle" },
  reducers: {
    resetIsDeleted: (state) => {
      state.isRevDeleted = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteReview.pending, (state) => {
        state.error = null;
        state.status = "loading";
        // console.log("state.status", state.status);
      })
      .addCase(deleteReview.fulfilled, (state) => {
        state.isRevDeleted = false;
        state.status = "success";
        // console.log("state.status", state.status);
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isRevDeleted = false;
        state.error = action.payload;
        state.status = "failed";
        // console.log("state.status", state.status);
      });
  },
});

export const { resetIsDeleted } = deleteReviewSlice.actions;

export const deleteReviewState = deleteReviewSlice.reducer;
