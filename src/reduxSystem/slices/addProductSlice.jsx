import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

const initialState = {
  isProductAdded: false,
  loading: false,
  error: null,
};

export const addProduct = createAsyncThunk(
  "addProduct",
  async (product, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", product.title || "");
      formData.append("price", product.price || "");
      formData.append("description", product.description || "");
      formData.append("stock", product.stock || "");
      formData.append("category", product.category || "");

      if (product.thumbnail) {
        formData.append("thumbnail", product.thumbnail);
      }

      // ✅ التأكد أن images ليست undefined قبل استخدام forEach
      if (Array.isArray(product.images) && product.images.length > 0) {
        product.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      // console.log([...formData]);

      // إرسال الطلب باستخدام axios
      const response = await axiosClient.post(
        API_ENDPOINTS.ADMIN_ENPOINTS.ADD_PRODUCT,
        formData,
      );

      return response.data; // إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const addProductSlice = createSlice({
  name: "addProductSlice",
  initialState,
  reducers: {
    resetAddState: (state) => {
      // console.log("🔄 Resetting productAdded state...");
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProduct.fulfilled, (state, action) => {
      // console.log("✅ Product added successfully", action.payload);
      state.isProductAdded = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      // console.log("❌ Failed to add product", action.payload);
      state.isProductAdded = false;
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetAddState } = addProductSlice.actions;

export const addProductState = addProductSlice.reducer;
