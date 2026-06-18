import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// Async thunk to delete an offer
export const deleteOffer = createAsyncThunk(
  "offer/delete",
  async (productId, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.delete(
        API_ENDPOINTS.ADMIN_ENPOINTS.DELETE_OFFER,
        {
          data: { productId }, // إرسال productId في data
        },
      );

      return { productId }; // Return deleted product ID
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const offerSlice = createSlice({
  name: "offer",
  initialState: {
    isOfferDeleted: false,
    success: "idle",
    error: null,
    loading: false,
  },
  reducers: {
    resetIsOfferDeleted: (state) => {
      state.isOfferDeleted = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(deleteOffer.pending, (state) => {
        state.loading = true;
        state.success = "loading";
        // console.log("state.success", state.success);
      })
      .addCase(deleteOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "success";
        state.isOfferDeleted = true;
        // console.log("state.success", state.success);
      })
      .addCase(deleteOffer.rejected, (state, action) => {
        state.loading = false;
        state.success = "failed";
        state.isOfferDeleted = false;
        state.error = action.payload;
        // console.log("state.success", state.success);
      });
  },
});

export const { resetIsOfferDeleted } = offerSlice.actions;
export const deleteOfferState = offerSlice.reducer;
