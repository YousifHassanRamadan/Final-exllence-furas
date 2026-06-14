import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// 🔹 Async Thunk لتغيير كلمة المرور
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.put(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.EDIT_PASSWORD,
        { currentPassword, newPassword }
      );

      return response.data; // ✅ إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 🔹 إنشاء Slice
const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    status: "",
  },
  reducers: {
    // 🔹 إضافة reducer لتنظيف الحالة بعد عرض التوست
    clearPasswordState: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
      state.status = "";
    },
    // 🔹 إضافة reducer لإعادة تعيين الحالة بالكامل
    resetPasswordState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
      state.status = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.status = "loading";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.errorMessage = "";
        state.status = "success";
        // console.log("Password changed successfully:", action.payload);
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.status = "failed";
        // console.log("Password change failed:", action.payload);
      });
  },
});

export const { clearPasswordState, resetPasswordState } =
  changePasswordSlice.actions;
export const changePasswordState = changePasswordSlice.reducer;
