import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

const initialState = {
  categoryAdded: false,
  error: null,
  status: "idle",
};

export const addCategory = createAsyncThunk(
  "addCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(
        API_ENDPOINTS.ADMIN_ENPOINTS.ADD_CATEGORY,
        category
      );

      return response.data; // إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response || error);
    }
  }
);

const addCategorySlice = createSlice({
  name: "addCategorySlice",
  initialState,
  reducers: {
    resetAddCategoryState: (state) => {
      state.categoryAdded = false;
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCategory.pending, (state, action) => {
      state.status = "loading";
      // console.log("state.status", state.status);
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.categoryAdded = true;
      state.error = null;
      state.status = "success";
      // console.log("state.status", state.status);
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      state.categoryAdded = false;
      state.error = action;
      state.status = "failed";
      // console.log("state.status", state.status);
      // console.log("action", action);
    });
  },
});

export const { resetAddCategoryState } = addCategorySlice.actions;

export const addCategoryState = addCategorySlice.reducer;
