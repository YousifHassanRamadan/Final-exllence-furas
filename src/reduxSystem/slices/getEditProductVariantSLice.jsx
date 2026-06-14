import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// API Endpoint
const getProdVarApi = "http://localhost:3000/admin/get-edit-variant/";

// Async Thunk لجلب بيانات المنتج
export const fetchProductVariants = createAsyncThunk(
  "productVariant/fetchEdit",
  async (productId, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.get(
        `${API_ENDPOINTS.ADMIN_ENPOINTS.GET_EDIT_PRODUCT_VARIANT}${productId}`
      );

      return response.data; // ✅ إرجاع البيانات
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice لتعريف الحالة والمتغيرات
const productVariantSlice = createSlice({
  name: "productVariant",
  initialState: {
    variant: null,
    loading: false,
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductVariants.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
        // console.log("state.status", state.status);
      })
      .addCase(fetchProductVariants.fulfilled, (state, action) => {
        state.loading = false;
        state.variant = action.payload.variants;
        state.status = "success";
        // console.log("action.payload", action.payload);

        // console.log("state.status", state.status);
      })
      .addCase(fetchProductVariants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
        // console.log("state.status", state.status);
      });
  },
});

export const getProdVariantState = productVariantSlice.reducer;
