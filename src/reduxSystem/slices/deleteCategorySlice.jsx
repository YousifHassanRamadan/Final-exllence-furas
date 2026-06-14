import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

export const deleteCategory = createAsyncThunk(
  "deleteAllCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(
        API_ENDPOINTS.ADMIN_ENPOINTS.DELETE_CATEGORY,
        {
          data: { categoryId: id }, // إرسال categoryId في data
        }
      );

      return response.data; // إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const deleteCategorySlice = createSlice({
  name: "deleteCategorySlice",
  initialState: {
    categoryDeleted: false,
    error: null,
  },
  reducers: {
    resetDeletedState: (state) => {
      state.categoryDeleted = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCategory.fulfilled, (state) => {
      // console.log("✅ category deleted successfully");
      state.categoryDeleted = true;
      state.error = null;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      // console.log("❌ Failed to delete category", action.payload);
      state.categoryDeleted = false;
      state.error = action.payload;
    });
  },
});

export const { resetDeletedState } = deleteCategorySlice.actions;

export const deleteCategoryState = deleteCategorySlice.reducer;
