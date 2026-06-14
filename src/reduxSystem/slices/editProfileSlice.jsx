import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// 🟢 Async Thunk لتحديث بيانات المستخدم باستخدام JSON
export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (updatedFields, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.put(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.EDIT_PROFILE,
        updatedFields
      );

      return response.data; // ✅ إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 🟢 إنشاء الـ Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    isProfileEdited: false, // قيمة افتراضية أكثر منطقية
    isEditProfLoading: true,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(updateUserInfo.pending, (state) => {
        state.status = "loading";
        state.isProfileEdited = false;
      })
      .addCase(updateUserInfo.fulfilled, (state) => {
        state.status = "succeeded";
        state.isProfileEdited = true;
        state.isEditProfLoading = false;
        // console.log("status:", state.status);
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isProfileEdited = false;
        state.isEditProfLoading = false;
        // console.log("status:", state.status);
      });
  },
});

// 🟢 تصدير الـ Reducer
export const userSliceState = userSlice.reducer;
