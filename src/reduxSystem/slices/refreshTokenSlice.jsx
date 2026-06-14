import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API لتحديث التوكن
const refreshTokenApi = "http://localhost:3000/user/get-refresh-token";

// ✅ Thunk لجلب التوكن الجديد عند انتهاء صلاحيته
export const refreshAuthToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axios.post(
        refreshTokenApi,
        {},
        {
          withCredentials: true, // 🔥 إرسال الكوكيز لضمان تمرير الـ refreshToken
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      // 🔹 حفظ التوكن الجديد في localStorage

      return data.token; // ✅ إرجاع التوكن الجديد
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ إنشاء Slice لتحديث التوكن
const refreshTokenSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null, // 🔹 جلب التوكن من localStorage
    loading: false,
    error: null,
    status: "idle",
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(refreshAuthToken.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        // console.log("🔄 تحديث التوكن قيد التنفيذ...");
      })
      .addCase(refreshAuthToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload; // ✅ تحديث التوكن في الـ state
        state.error = null;
        state.status = "success";
        // console.log("✅ تم تحديث التوكن بنجاح:", action.payload);
      })
      .addCase(refreshAuthToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
        // console.log("❌ فشل تحديث التوكن:", action.payload);
      });
  },
});

export const refreshTokenState = refreshTokenSlice.reducer;
