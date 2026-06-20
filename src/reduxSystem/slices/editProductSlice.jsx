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
      // product.images may contain a mix of existing URL strings (kept images)
      // and new File objects (newly added images). Only the new File objects
      // need to be uploaded here.
      if (Array.isArray(product.images) && product.images.length > 0) {
        product.images.forEach((image) => {
          if (image instanceof File) {
            formData.append("images", image);
          }
        });
      }

      // ✅ مصفوفة الصور التي يجب حذفها من السيرفر/التخزين (Cloudinary/S3/...)
      // يتم إرسالها كـ JSON string ضمن مفتاح imagesToRemove
      if (
        Array.isArray(product.imagesToRemove) &&
        product.imagesToRemove.length > 0
      ) {
        formData.append(
          "imagesToRemove",
          JSON.stringify(product.imagesToRemove),
        );
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
        },
      );

      return response.data; // ✅ إرجاع البيانات القادمة من السيرفر
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
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
