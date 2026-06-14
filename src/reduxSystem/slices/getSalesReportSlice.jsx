import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// Async thunk to fetch sales report
export const fetchSalesReport = createAsyncThunk(
  "admin/fetchSalesReport",
  async (_, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.get(
        API_ENDPOINTS.ADMIN_ENPOINTS.GET_SALES_REPORT
      );

      return response.data; // ✅ إرجاع البيانات
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice definition
const salesReportSlice = createSlice({
  name: "salesReport",
  initialState: {
    report: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetSalesReport: (state) => {
      state.report = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesReport.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSalesReport.fulfilled, (state, action) => {
        state.report = action.payload.data;
        state.status = "success";
      })
      .addCase(fetchSalesReport.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { resetSalesReport } = salesReportSlice.actions;

export const salesReportState = salesReportSlice.reducer;
