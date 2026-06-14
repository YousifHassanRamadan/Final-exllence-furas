import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

const initialState = {
  favourites: [],
  loading: false,
  isLoading: false,
};

// ✅ Thunk لإرسال الطلب إلى السيرفر
export const toggleFavorite = createAsyncThunk(
  "favorites/toggleFavorite",
  async (product, { rejectWithValue }) => {
    try {
      const productId = product._id; // استخراج الـ ID من المنتج

      // إرسال الطلب باستخدام axios
      const response = await axiosClient.post(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.ADD_DELETE_FAVOURITE,
        { productId }
      );

      return response.data; // ✅ إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Slice لإدارة حالة المفضلة
const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(toggleFavorite.pending, (state) => {
        state.loading = true;
        state.isLoading = true;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoading = false;

        // ✅ تحديث `state.favourites` مباشرةً من استجابة الـ API (مصفوفة الـ IDs)
        state.favourites = action.payload.favorites;

        // console.log("Favorites updated successfully!");
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.loading = false;
        state.isLoading = false;
        state.error = action.payload;
        // console.log("Failed to update favorites:", action.payload);
      });
  },
});

export const favouriteState = favouriteSlice.reducer;
