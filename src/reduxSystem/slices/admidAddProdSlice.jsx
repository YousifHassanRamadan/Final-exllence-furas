import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

export const AdminAddProduct = createAsyncThunk(
  "products/AdminAddProduct",
  async (product, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", product.title || "");
      formData.append("arabicTitle", product.arabicTitle || "");
      formData.append("arabicDescription", product.arabicDescription || "");
      formData.append("price", product.price || "");
      formData.append("description", product.description || "");
      formData.append("stock", product.stock || "");
      formData.append("category", product.category || "");
      formData.append(
        "comingSoon",
        product.comingSoon === true ? "true" : "false",
      );

      if (product.thumbnail) {
        formData.append("thumbnail", product.thumbnail);
      }

      if (Array.isArray(product.images) && product.images.length > 0) {
        product.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      // console.log("from slice", [...formData]);

      const response = await axiosClient.post(
        API_ENDPOINTS.ADMIN_ENPOINTS.ADD_PRODUCT,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
    isProductAdded: false,
    status: "idle",
  },
  reducers: {
    resetState: (state) => {
      state.products = [];
      state.loading = false;
      state.error = null;
      state.isProductAdded = false;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AdminAddProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
        // console.log("state.status", state.status);
      })
      .addCase(AdminAddProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isProductAdded = true;
        state.products.push(action.payload);
        state.status = "success";
        // console.log("state.status", state.status);
      })
      .addCase(AdminAddProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
        // console.log("state.status", state.status);
        // console.log("state.error", state.error);
      });
  },
});

export const { resetState } = productSlice.actions;
export const AdminAddProductState = productSlice.reducer;
