import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// ✅ تعريف Thunk لتحديث حالة الطلب
export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async (orderObjectStatus, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.put(
        API_ENDPOINTS.ADMIN_ENPOINTS.EDIT_ORDER_STATUS,
        orderObjectStatus
      );

      return response.data; // 📌 إرجاع البيانات المحدثة
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ إنشاء Slice
const editOrderStatusSlice = createSlice({
  name: "editOrderStatus",
  initialState: {
    loading: false,
    error: null,
    status: "idle",
    isStatusEdited: true,
  },
  reducers: {
    resetIsStatusEdited: (state) => {
      state.isStatusEdited = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
        // console.log("state.status", state.status);
      })
      .addCase(updateOrderStatus.fulfilled, (state) => {
        state.loading = false;
        state.status = "success";
        state.isStatusEdited = false;
        // console.log("state.status", state.status);
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
        state.isStatusEdited = false;
        // console.log("state.status", state.status);
        // console.log("action.payload", action.payload);
      });
  },
});

export const { resetIsStatusEdited } = editOrderStatusSlice.actions;

export const editOrderStatusState = editOrderStatusSlice.reducer;
