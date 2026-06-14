import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

const CategoryiesAPI = "http://localhost:3000/products/categories/list";

const initialState = {
  Allcategories: [],
  categoryLoading: false,
  error: null,
};

export const getAllCategory = createAsyncThunk(
  "getAllCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.GET_CATEGORIES_LIST
      );

      return response.data; // إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const getCategorySlice = createSlice({
  name: "getCategorySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.pending, (state) => {
      state.categoryLoading = true;
    });
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.categoryLoading = false;
      state.Allcategories = action.payload.categories;
    });
    builder.addCase(getAllCategory.rejected, (state, action) => {
      state.categoryLoading = false;
      state.error = action.payload;
    });
  },
});

export const getCategoryState = getCategorySlice.reducer;
