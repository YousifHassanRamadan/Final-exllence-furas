import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// Async thunk to update variant
export const updateProductVariant = createAsyncThunk(
  "variant/update",
  async (updatedData, { rejectWithValue }) => {
    try {
      const { variantId, color, size, newImages, imagesToRemove } = updatedData;

      const formData = new FormData();
      formData.append("variantId", variantId || "");
      formData.append("color", color || "");
      formData.append("size", size || "");

      // new image files to upload
      if (Array.isArray(newImages) && newImages.length > 0) {
        newImages.forEach((image) => {
          formData.append("images", image);
        });
      }

      // existing image URLs the user removed -> backend should delete these
      // from storage (Cloudinary/S3/...) and pull them out of the variant doc
      if (Array.isArray(imagesToRemove) && imagesToRemove.length > 0) {
        formData.append("imagesToRemove", JSON.stringify(imagesToRemove));
      }

      // إرسال الطلب باستخدام axios
      const response = await axiosClient.put(
        API_ENDPOINTS.ADMIN_ENPOINTS.EDIT_VARIANT,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data; // Returning updated variant data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const variantSlice = createSlice({
  name: "variant",
  initialState: {
    isVariantEdited: true,
    success: "idle",
    error: null,
    loading: false,
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
        state.loading = true;
        // console.log("state.success", state.success);
      })
      .addCase(updateProductVariant.fulfilled, (state, action) => {
        state.success = "success";
        state.isVariantEdited = false;
        state.loading = false;
        // console.log("state.success", state.success);
      })
      .addCase(updateProductVariant.rejected, (state, action) => {
        state.success = "failed";
        state.isVariantEdited = false;
        state.error = action.payload;
        state.loading = false;
        // console.log("state.success", state.success);
      });
  },
});

export const { resetIsVariantEdited } = variantSlice.actions;

export const editProdVariantState = variantSlice.reducer;
