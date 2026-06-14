import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// Async thunk to update variant
export const updateProductVariant = createAsyncThunk(
  "variant/update",
  async (updatedData, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.put(
        API_ENDPOINTS.ADMIN_ENPOINTS.EDIT_VARIANT,
        updatedData
      );

      return response.data; // Returning updated variant data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const variantSlice = createSlice({
  name: "variant",
  initialState: {
    isVariantEdited: true,
    success: "idle",
    error: null,
  },
  reducers: {
    resetIsVariantEdited: (state) => {
      state.isVariantEdited = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateProductVariant.pending, (state) => {
        state.success = "loading";
        // console.log("state.success", state.success);
      })
      .addCase(updateProductVariant.fulfilled, (state, action) => {
        state.success = "success";
        state.isVariantEdited = false;
        // console.log("state.success", state.success);
      })
      .addCase(updateProductVariant.rejected, (state, action) => {
        state.success = "failed";
        state.isVariantEdited = false;
        state.error = action.payload;
        // console.log("state.success", state.success);
      });
  },
});

export const { resetIsVariantEdited } = variantSlice.actions;

export const editProdVariantState = variantSlice.reducer;
