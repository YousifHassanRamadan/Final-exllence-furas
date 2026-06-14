import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

const initialState = {
  isVariantAdded: false,
  loading: false,
  error: null,
};

export const addVariant = createAsyncThunk(
  "addVariant",
  async (variant, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("productId", variant.productId || "");
      formData.append("color", variant.color || "");
      formData.append("size", variant.size || "");
      formData.append("stock", variant.stock || "");
      formData.append("price", variant.price || "");

      // ✅ التأكد من أن الصور ليست undefined قبل رفعها
      if (Array.isArray(variant.images) && variant.images.length > 0) {
        variant.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      // console.log([...formData]);

      const response = await axiosClient.post(
        API_ENDPOINTS.ADMIN_ENPOINTS.ADD_VARIANT,
        formData
      );

      return response.data; // إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const variantSlice = createSlice({
  name: "variantSlice",
  initialState,
  reducers: {
    resetVariantState: (state) => {
      // console.log("🔄 Resetting variant state...");
      state.isVariantAdded = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addVariant.pending, (state) => {
      state.loading = true;
      state.isVariantAdded = false;
      state.error = null;
    });
    builder.addCase(addVariant.fulfilled, (state, action) => {
      // console.log("✅ Variant added successfully", action.payload);
      state.isVariantAdded = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addVariant.rejected, (state, action) => {
      // console.log("❌ Failed to add variant", action.payload);
      state.isVariantAdded = false;
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetVariantState } = variantSlice.actions;
export const variantState = variantSlice.reducer;
