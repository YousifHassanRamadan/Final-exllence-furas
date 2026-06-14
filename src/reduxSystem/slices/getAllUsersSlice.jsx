import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// Async thunk to fetch users with search query
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (searchQuery = "", { rejectWithValue }) => {
    try {
      let endPoint = `${API_ENDPOINTS.ADMIN_ENPOINTS.GET_ALL_USERS}`;
      if (searchQuery) {
        endPoint += `?search=${searchQuery}`;
      }

      // إرسال الطلب باستخدام axios
      const response = await axiosClient.get(endPoint);

      return response.data; // ✅ إرجاع البيانات
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Redux slice
const getAllUsersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.users;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const getAllUsersState = getAllUsersSlice.reducer;
