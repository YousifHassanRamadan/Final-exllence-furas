import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

export const editCategory = createAsyncThunk(
  "editCategory",
  async (category, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.put(
        API_ENDPOINTS.ADMIN_ENPOINTS.EDIT_CATEGOTRY,
        {
          name: category.name,
          categoryId: category.categoryId,
        }
      );

      return response.data; // ✅ إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const editCategorySlice = createSlice({
  name: "editCategorySlice",
  initialState: { isCategoryEdited: false, error: null },
  reducers: {
    resetEditCatState: (state) => {
      state.isCategoryEdited = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editCategory.fulfilled, (state) => {
      // console.log("✅ Category Edited successfully");
      state.isCategoryEdited = true;
      state.error = null;
    });
    builder.addCase(editCategory.rejected, (state, action) => {
      // console.log("❌ Failed to Edit Category", action.payload);
      state.error = action.payload;
      state.isCategoryEdited = false;
    });
  },
});

export const { resetEditCatState } = editCategorySlice.actions;

export const editCategoryState = editCategorySlice.reducer;
