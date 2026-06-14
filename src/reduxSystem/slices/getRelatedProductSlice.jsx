import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// دالة جلب المنتجات ذات الصلة
export const fetchRelatedProducts = createAsyncThunk(
  "relatedProducts/fetchRelatedProducts",
  async (productId, { rejectWithValue }) => {
    try {
      let endPoint = `${API_ENDPOINTS.CUSTOMER_ENDPOINTS.GET_RELATED_PRODUCTS}`;

      if (productId) {
        endPoint += `?productId=${productId}`;
      }
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.get(endPoint);

      return response.data; // ✅ إرجاع البيانات
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// إنشاء Slice
const relatedProductsSlice = createSlice({
  name: "relatedProducts",
  initialState: {
    relatedProducts: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProducts = action.payload.relatedProducts;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// تصدير الـ Reducer
export const relatedProductsState = relatedProductsSlice.reducer;
