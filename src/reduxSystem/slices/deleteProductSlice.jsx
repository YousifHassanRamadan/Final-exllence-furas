import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

const initialState = {
  loading: false,
  error: null,
};

export const deleteAdminProducts = createAsyncThunk(
  "deleteAdminProducts",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(
        API_ENDPOINTS.ADMIN_ENPOINTS.DELETE_PRODUCT,
        {
          data: { productId: id }, // إرسال البيانات في `data` عند استخدام DELETE
        }
      );

      return response.data; // إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const deleteAdminProductsSlice = createSlice({
  name: "deleteAdminProductsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteAdminProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAdminProducts.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteAdminProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const deleteAdminProductsState = deleteAdminProductsSlice.reducer;
