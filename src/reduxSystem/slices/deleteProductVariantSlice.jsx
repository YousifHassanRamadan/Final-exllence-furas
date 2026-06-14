import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// Async thunk to delete a variant
export const deleteProductVariant = createAsyncThunk(
  "variant/delete",
  async (variantId, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.delete(
        API_ENDPOINTS.ADMIN_ENPOINTS.DELETE_PRODUCT_VARIANT,
        {
          data: { variantId }, // إرسال variantId في data
        }
      );

      return variantId; // Returning the deleted variant's ID
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const deleteVariantSlice = createSlice({
  name: "deleteVariant",
  initialState: {
    isVariantDeleted: true,
    success: "idle",
    error: null,
  },
  reducers: {
    resetIsVariantDeleted: (state) => {
      state.isVariantDeleted = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(deleteProductVariant.pending, (state) => {
        state.success = "loading";
      })
      .addCase(deleteProductVariant.fulfilled, (state, action) => {
        state.success = "success";
        state.isVariantDeleted = false;
      })
      .addCase(deleteProductVariant.rejected, (state, action) => {
        state.success = "failed";
        state.isVariantDeleted = false;
        state.error = action.payload;
      });
  },
});

export const { resetIsVariantDeleted } = deleteVariantSlice.actions;
export const deleteProdVariantState = deleteVariantSlice.reducer;
