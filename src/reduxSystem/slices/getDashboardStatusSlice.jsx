import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// Async thunk to fetch dashboard statistics
export const fetchDashboardStats = createAsyncThunk(
  "admin/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.get(
        API_ENDPOINTS.ADMIN_ENPOINTS.GET_DASHBOARD_STATUS
      );

      return response.data; // ✅ إرجاع البيانات
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice definition
const dashboardStatsSlice = createSlice({
  name: "dashboardStats",
  initialState: {
    stats: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetDashboardStats: (state) => {
      state.stats = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.stats = action.payload.stats;
        state.status = "success";
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { resetDashboardStats } = dashboardStatsSlice.actions;

export const dashboardStatsState = dashboardStatsSlice.reducer;
