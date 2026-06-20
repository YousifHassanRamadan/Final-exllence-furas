import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { ImagePlus, Upload, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchProductVariants } from "../../../reduxSystem/slices/getEditProductVariantSLice";
import {
  resetIsVariantEdited,
  updateProductVariant,
} from "../../../reduxSystem/slices/editVariantProductSlice";
import {
  deleteProductVariant,
  resetIsVariantDeleted,
} from "../../../reduxSystem/slices/deleteProductVariantSlice";

const EditAndDeleteVariantProduct = ({ item, setActiveForm }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { variant, loading, error } = useSelector(
    (state) => state.getProdVariantState,
  );

  const { isVariantEdited, loading: editLoading } = useSelector(
    (state) => state.editProdVariantState,
  );

  const { isVariantDeleted } = useSelector(
    (state) => state.deleteProdVariantState,
  );

  const sizes = ["M", "L", "XL", "2XL", "3XL", "4XL"];

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [variantList, setVariantList] = useState([]);

  // Existing image URLs (already on the server) for the selected variant
  const [existingImages, setExistingImages] = useState([]);
  // Newly added File objects for the selected variant
  const [newImages, setNewImages] = useState([]);
  // Local preview URLs for newly added files (so we can revoke them later)
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  // Existing image URLs the user removed -> sent to backend as imagesToRemove
  const [imagesToRemove, setImagesToRemove] = useState([]);

  useEffect(() => {
    if (item.variants.length >= 2) {
      dispatch(fetchProductVariants(item._id)).then(() => {
        dispatch(resetIsVariantEdited());
        dispatch(resetIsVariantDeleted());
      });
    } else if (item.variants.length === 1) {
      dispatch(fetchProductVariants(item._id)).then(() => {
        dispatch(resetIsVariantEdited());
        dispatch(resetIsVariantDeleted());
        if (!isVariantDeleted) setActiveForm(null);
      });
    }
  }, [
    dispatch,
    item._id,
    isVariantEdited,
    isVariantDeleted,
    item.variants.length,
  ]);

  useEffect(() => {
    if (variant) {
      setVariantList(variant);
    }
  }, [variant]);

  const validationSchema = Yup.object({
    color: Yup.string().required(t("color_required")),
    size: Yup.string().nullable(),
  });

  const resetImageState = () => {
    // free any local blob previews before clearing them
    newImagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setNewImages([]);
    setNewImagePreviews([]);
    setImagesToRemove([]);
  };

  const formik = useFormik({
    initialValues: {
      color: "",
      size: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!selectedVariant) return;

      const updatedVariant = {
        ...values,
        variantId: selectedVariant._id,
        newImages,
        imagesToRemove,
      };

      try {
        await dispatch(updateProductVariant(updatedVariant)).unwrap();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product variant updated successfully",
        });
        resetImageState();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error?.data?.message ||
            error?.message ||
            "Failed to update product variant",
        });
      }
    },
  });

  const handleVariantChange = (variantId) => {
    const selected = variantList.find((v) => v._id === variantId);
    setSelectedVariant(selected);
    if (selected) {
      formik.setValues({
        color: selected.color || "",
        size: selected.size || "",
      });
      setExistingImages(selected.images || []);
      resetImageState();
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (existingImages.length + newImages.length + files.length > 5) {
      Swal.fire({
        icon: "warning",
        title: t("max_5_images") || "Max 5 images allowed",
      });
      return;
    }

    setNewImages((prev) => [...prev, ...files]);
    setNewImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeExistingImage = (index) => {
    const removedUrl = existingImages[index];
    setImagesToRemove((prev) => [...prev, removedUrl]);
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    URL.revokeObjectURL(newImagePreviews[index]);
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteVariant = (variantId) => {
    Swal.fire({
      title: t("are_you_sure"),
      text: t("delete_variant_warning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("yes_delete"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductVariant(variantId));
        Swal.fire(t("deleted"), t("variant_deleted_success"), "success");
      }
    });
  };

  console.log("Current variant list:", variantList);

  return (
    <div className="relative p-6 bg-white shadow-lg rounded-lg">
      {/* زر الإغلاق */}
      <button
        className="absolute top-3 right-3 text-white bg-red-500 rounded-full p-1"
        onClick={() => setActiveForm(null)}
      >
        <IoClose size={24} />
      </button>

      <h2 className="text-xl font-semibold mb-4 text-[#284980]">
        {t("edit_variant")}
      </h2>

      {/* التحقق إذا لم يكن هناك أي فاريانت */}
      {variantList.length === 0 ? (
        <p className="text-gray-500 text-center p-4 bg-gray-100 rounded-lg">
          {t("no_variants_to_edit")}
        </p>
      ) : (
        <>
          {/* قائمة الفاريانت مع زر الحذف */}
          <div className="flex flex-col gap-2 mb-4">
            {variantList.map((v) => (
              <div
                key={v._id}
                className={`flex items-center justify-between border p-2 rounded-lg cursor-pointer ${
                  selectedVariant?._id === v._id ? "bg-gray-200" : ""
                }`}
                onClick={() => handleVariantChange(v._id)}
              >
                <span>
                  {v.color} - {v.size}
                </span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteVariant(v._id);
                  }}
                >
                  <MdDelete size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* نموذج تعديل الفاريانت */}
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 w-full"
          >
            {/* إدخال اللون */}
            <input
              type="text"
              name="color"
              placeholder={t("color")}
              value={formik.values.color}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border rounded-lg p-2 w-full"
            />
            {formik.touched.color && formik.errors.color && (
              <p className="text-red-500">{formik.errors.color}</p>
            )}

            {/* اختيار الحجم */}
            <select
              name="size"
              value={formik.values.size}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border rounded-lg p-2 w-full"
            >
              <option value="">{t("select_size")}</option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {formik.touched.size && formik.errors.size && (
              <p className="text-red-500">{formik.errors.size}</p>
            )}

            {/* صور الفاريانت - إضافة وحذف */}
            {selectedVariant && (
              <div className="flex flex-col gap-2">
                <label className="text-[#284980] font-medium">
                  {t("variant_images") || "Variant Images"}
                </label>

                <div className="border p-3 rounded-lg flex flex-col items-center relative cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImagesChange}
                  />
                  {existingImages.length > 0 || newImages.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2 w-full">
                      {existingImages.map((img, index) => (
                        <div
                          key={`existing-${index}`}
                          className="relative w-20 h-20"
                        >
                          <img
                            src={img}
                            alt={`variant-${index}`}
                            className="h-20 w-20 object-cover rounded-lg"
                          />
                          <X
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                            size={16}
                            onClick={(e) => {
                              e.stopPropagation();
                              removeExistingImage(index);
                            }}
                          />
                        </div>
                      ))}
                      {newImagePreviews.map((img, index) => (
                        <div
                          key={`new-${index}`}
                          className="relative w-20 h-20"
                        >
                          <img
                            src={img}
                            alt={`new-variant-${index}`}
                            className="h-20 w-20 object-cover rounded-lg"
                          />
                          <X
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                            size={16}
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNewImage(index);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-gray-400 py-4">
                      <ImagePlus size={32} />
                      <span>{t("upload_images") || "Upload images"}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* زر التحديث */}
            <button
              type="submit"
              className="bg-[#284980] text-white py-2 rounded-lg hover:bg-blue-600 transition w-full flex items-center justify-center gap-2"
            >
              {editLoading ? (
                <div>
                  <p>Loading...</p>
                </div>
              ) : (
                <>
                  <Upload size={18} />
                  <span>{t("update_variant")}</span>
                </>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditAndDeleteVariantProduct;
