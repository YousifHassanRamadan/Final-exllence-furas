import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// إنشاء `Thunk` لإرسال المراجعة
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.post(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.ADD_REVIEW,
        reviewData
      );

      // console.log("Server Response:", response.data);

      return response.data; // إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    isRevAdded: true,
    error: null,
    status: "idle",
  },
  reducers: {
    resetIsRevAdded: (state) => {
      state.isRevAdded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.error = null;
        state.status = "loading";
        // console.log("state.status", state.status);
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isRevAdded = false;
        state.status = "success";
        // console.log("state.status", state.status);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isRevAdded = false;
        state.error = action.payload;
        state.status = "failed";
        // console.log("state.status", state.status);
      });
  },
});

export const { resetIsRevAdded } = reviewSlice.actions;

export const addRevState = reviewSlice.reducer;
