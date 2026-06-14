import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// ✅ جلب قائمة المفضلة من الباك‌اند
export const fetchFavorites = createAsyncThunk(
  "favourite/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.get(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.GET_FAVOURITES
      );

      return response.data; // نفترض أن البيانات هي مصفوفة من المنتجات المفضلة
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    favourites: [],
    loading: true,
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favourites = action.payload.favorites;
        state.loading = false;
        // console.log("status:", state.status);
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
        // console.log("status:", state.status);
      });
  },
});

export const getFavouritestate = favouriteSlice.reducer;
