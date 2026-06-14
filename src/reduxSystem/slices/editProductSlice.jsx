import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";
import { API_ENDPOINTS } from "../../common/constants";

const initialState = {
  editLoading: false,
  productEdited: false,
  error: null,
};

export const editProduct = createAsyncThunk(
  "editProduct",
  async (product, { rejectWithValue }) => {
    try {
      const prodId = product._id;
      const formData = new FormData();
      formData.append("title", product.title || "");
      formData.append("price", product.price || "");
      formData.append("productId", prodId || "");
      formData.append("description", product.description || "");
      formData.append("stock", product.stock || "");
      formData.append("category", product.category || "");
      formData.append("arabicTitle", product.arabicTitle || "");
      formData.append("arabicDescription", product.arabicDescription || "");
      formData.append("comingSoon", product.comingSoon);

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
      const response = await axiosClient.put(
        API_ENDPOINTS.ADMIN_ENPOINTS.EDIT_PRODUCT,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data; // ✅ إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const editProductSlice = createSlice({
  name: "editProductSlice",
  initialState,
  reducers: {
    resetEditState: (state) => {
      state.productEdited = false;
      state.editLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(editProduct.pending, (state) => {
      state.productEdited = false;
      state.editLoading = true;
    });
    builder.addCase(editProduct.fulfilled, (state) => {
      state.productEdited = true;
      state.editLoading = false;
      state.error = null;
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      state.productEdited = false;
      state.editLoading = false;
      state.error = action.payload;
    });
  },
});

export const { resetEditState } = editProductSlice.actions;
export const editProductState = editProductSlice.reducer;
