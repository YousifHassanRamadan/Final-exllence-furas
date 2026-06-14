import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

// 🔹 Async Thunk لحذف العنوان
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      // إرسال الطلب باستخدام axios
      const response = await axiosClient.delete(
        API_ENDPOINTS.CUSTOMER_ENDPOINTS.DELETE_USER_ADDRESS,
        {
          data: { addressId }, // إرسال addressId في data
        }
      );

      return addressId; // ✅ إرجاع ID العنوان المحذوف لتحديث الحالة
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || error.message,
      });
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 🔹 Slice لتعريف الحالة والإجراءات
const deleteAddressSlice = createSlice({
  name: "deleteAddress",
  initialState: {
    isLoading: false,
    error: null,
    isAddressDeleted: true,
    status: "idle",
  },
  reducers: {
    resetisAddressDeleted: (state) => {
      state.isAddressDeleted = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "loading";
        // console.log("state.status", state.status);
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAddressDeleted = false;
        state.error = null;
        state.status = "success";
        // console.log("state.status", state.status);
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isAddressDeleted = false;
        state.error = action.payload;
        state.status = "failed";
        // console.log("state.status", state.status);
      });
  },
});

export const { resetisAddressDeleted } = deleteAddressSlice.actions;

export const deleteAddressState = deleteAddressSlice.reducer;
