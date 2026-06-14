import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

const initialState = {
  isDiscountAdded: false,
  loading: false,
  error: null,
};

// ✅ إضافة الخصم باستخدام axios
export const addDiscount = createAsyncThunk(
  "addDiscount",
  async (discountData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(
        API_ENDPOINTS.ADMIN_ENPOINTS.ADD_OFFER,
        discountData
      );

      return response.data; // إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const discountSlice = createSlice({
  name: "discountSlice",
  initialState,
  reducers: {
    resetDiscountState: (state) => {
      // console.log("🔄 Resetting discount state...");
      state.isDiscountAdded = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addDiscount.pending, (state) => {
      state.loading = true;
      state.isDiscountAdded = false;
      state.error = null;
    });
    builder.addCase(addDiscount.fulfilled, (state, action) => {
      // console.log("✅ Discount added successfully", action.payload);
      state.isDiscountAdded = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addDiscount.rejected, (state, action) => {
      // console.log("❌ Failed to add discount", action.payload);
      state.isDiscountAdded = false;
      state.loading = false;
      state.error = action.payload;

      console.log("action.payload", action.payload);
    });
  },
});

export const { resetDiscountState } = discountSlice.actions;
export const discountState = discountSlice.reducer;
