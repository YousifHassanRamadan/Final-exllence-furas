import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

export const editAddress = createAsyncThunk(
  "user/editAddress",
  async (updatedFields, { rejectWithValue }) => {
    // console.log("updatedFields from slice", updatedFields);

    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.put(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.EDIT_ADDRESS,
        updatedFields
      );

      return response.data; // ✅ إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const editAddressSlice = createSlice({
  name: "editAddressSlice",
  initialState: {
    status: "idle",
    error: null,
    isAddressEdited: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editAddress.pending, (state) => {
        state.status = "loading";
        state.error = null;
        // console.log("state.status", state.status);
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAddressEdited = false;
        // console.log("state.status", state.status);
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isAddressEdited = false;
        // console.log("state.status", state.status);
        // console.log("action.payload", action.payload);
      });
  },
});

export const editAddressState = editAddressSlice.reducer;
