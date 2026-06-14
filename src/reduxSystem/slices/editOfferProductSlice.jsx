import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// Async thunk to update offer
export const updateOffer = createAsyncThunk(
  "offer/update",
  async (updatedData, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.put(
        API_ENDPOINTS.ADMIN_ENPOINTS.EDIT_OFFER,
        updatedData
      );

      return response.data; // Returning updated offer data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const offerSlice = createSlice({
  name: "offer",
  initialState: {
    isOfferEdited: true,
    success: "idle",
    error: null,
  },
  reducers: {
    resetIsOfferEdited: (state) => {
      state.isOfferEdited = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateOffer.pending, (state) => {
        state.success = "loading";
        // console.log("state.success", state.success);
      })
      .addCase(updateOffer.fulfilled, (state, action) => {
        state.success = "success";
        state.isOfferEdited = false;
        // console.log("state.success", state.success);
      })
      .addCase(updateOffer.rejected, (state, action) => {
        state.success = "failed";
        state.isOfferEdited = false;
        state.error = action.payload;
        // console.log("state.success", state.success);
      });
  },
});

export const { resetIsOfferEdited } = offerSlice.actions;

export const editOfferState = offerSlice.reducer;
