import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import { Input, Textarea, Select, Option } from "@material-tailwind/react";
import { ImagePlus, Upload, X } from "lucide-react";
import Swal from "sweetalert2";
import {
  editProduct,
  resetEditState,
} from "../../../reduxSystem/slices/editProductSlice";
import { useTranslation } from "react-i18next";

const EditProduct = ({ item, setIsEditOpen }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { productEdited, editLoading } = useSelector(
    (state) => state.editProductState,
  );

  const { Allcategories } =
    useSelector((state) => state.getCategoryState) || [];

  const {
    title,
    arabicTitle,
    price,
    description,
    arabicDescription,
    stock,
    category,
    thumbnail,
    images,
    _id,
    comingSoon,
  } = item;

  const [product, setProduct] = useState({
    title: `${title}`,
    arabicTitle: `${arabicTitle}` || "",
    price: `${price}`,
    description: `${description}`,
    arabicDescription: arabicDescription || "",
    stock: `${stock}`,
    category: `${category?.name}`,
    thumbnail: `${thumbnail}`,
    images: [...images],
    _id: `${_id}`,
    comingSoon: comingSoon,
  });

  const [errorMessage, setErrorMessage] = useState({});
  const [thumbnailPreview, setThumbnailPreview] = useState(`${thumbnail}`);
  const [imagePreviews, setImagePreviews] = useState([...images]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "stock" && value < 0) return;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setProduct((prev) => ({ ...prev, category: value }));
  };

  const handleComingSoonChange = (value) => {
    setProduct((prev) => ({ ...prev, comingSoon: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct((prev) => ({ ...prev, thumbnail: file }));
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const removeThumbnail = () => {
    setProduct((prev) => ({ ...prev, thumbnail: null }));
    setThumbnailPreview(null);
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + product.images.length > 5) {
      setErrorMessage((prev) => ({
        ...prev,
        images: t("max_5_images"),
      }));
      return;
    }
    setProduct((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const validateArabicInput = (text) => {
    const arabicRegex = /^[\u0600-\u06FF\s]+$/;
    if (text && !arabicRegex.test(text)) {
      return t("arabic_only");
    }
    if (!text) {
      return t("field_required");
    }
    return "";
  };

  const handleSubmit = async () => {
    const newError = {};
    if (!product.title) newError.title = t("product_title_required");
    if (!product.price || product.price <= 0)
      newError.price = t("price_must_be_positive");
    if (!product.description) newError.description = t("product_desc_required");
    if (!product.stock || product.stock < 0) newError.stock = t("stock_min");
    if (!product.category) newError.category = t("select_category");
    if (!product.thumbnail) newError.thumbnail = t("thumbnail_required");
    if (validateArabicInput(product.arabicTitle) !== "") {
      newError.arabicTitle = validateArabicInput(product.arabicTitle);
    }
    if (validateArabicInput(product.arabicDescription) !== "") {
      newError.arabicDescription = validateArabicInput(
        product.arabicDescription,
      );
    }

    if (Object.keys(newError).length > 0) {
      setErrorMessage(newError);
      return;
    }

    try {
      await dispatch(editProduct(product)).unwrap();
      Swal.fire({ icon: "success", text: t("product_edited_success") });
      setIsEditOpen(false);
    } catch (error) {
      Swal.fire({ icon: "error", text: error });
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-transparent p-4 z-[10000]">
      <div className="relative w-full sm:max-w-lg lg:max-w-5xl xl:max-w-6xl bg-white shadow-xl p-6 rounded-2xl max-h-[80vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={() => setIsEditOpen(false)}
          className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-[#284980]">
          {t("edit_product")}
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-[#284980] font-medium">
              {t("product_title_en")}
            </label>
            <Input
              name="title"
              value={product.title}
              onChange={handleChange}
              error={!!errorMessage.title}
              variant="outlined"
            />
          </div>
          {errorMessage.title && (
            <p className="text-red-500 text-sm">{errorMessage.title}</p>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[#284980] font-medium">
              {t("product_title_ar")}
            </label>
            <Input
              name="arabicTitle"
              placeholder={t("enter_product_title_ar")}
              value={product.arabicTitle}
              onChange={handleChange}
              error={!!errorMessage.arabicTitle}
              variant="outlined"
            />
          </div>
          {errorMessage.arabicTitle && (
            <p className="text-red-500 text-sm">{errorMessage.arabicTitle}</p>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[#284980] font-medium">{t("price")}</label>
            <Input
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              error={!!errorMessage.price}
            />
          </div>
          {errorMessage.price && (
            <p className="text-red-500">{errorMessage.price}</p>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[#284980] font-medium">
              {t("product_desc_en")}
            </label>
            <Textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              error={!!errorMessage.description}
              variant="outlined"
              className="p-16 pt-2"
            />
          </div>
          {errorMessage.description && (
            <p className="text-red-500 text-sm">{errorMessage.description}</p>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[#284980] font-medium">
              {t("product_desc_ar")}
            </label>
            <Textarea
              name="arabicDescription"
              placeholder={t("enter_product_desc_ar")}
              value={product.arabicDescription}
              onChange={handleChange}
              error={!!errorMessage.arabicDescription}
              variant="outlined"
              className="p-16 pt-2"
            />
          </div>
          {errorMessage.arabicDescription && (
            <p className="text-red-500 text-sm">
              {errorMessage.arabicDescription}
            </p>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[#284980] font-medium">{t("stock")}</label>
            <Input
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
              error={!!errorMessage.stock}
            />
          </div>
          {errorMessage.stock && (
            <p className="text-red-500">{errorMessage.stock}</p>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-[#284980] font-medium">
              {t("category")}
            </label>
            <Select
              value={product.category}
              onChange={handleCategoryChange}
              variant="outlined"
              error={!!errorMessage.category}
              className="p-5 pt-0"
            >
              {Allcategories.map((cat, index) => (
                <Option key={cat._id} value={cat.name}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </div>
          {errorMessage.category && (
            <p className="text-red-500">{errorMessage.category}</p>
          )}

          {/* Coming Soon Section */}
          <div className="flex flex-col gap-2">
            <label className="text-[#284980] font-medium">
              {t("coming_soon")}
            </label>
            <div className="flex gap-4">
              <Button
                onClick={() => handleComingSoonChange(true)}
                className={`flex-1 ${
                  product.comingSoon
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {t("yes")}
              </Button>
              <Button
                onClick={() => handleComingSoonChange(false)}
                className={`flex-1 ${
                  !product.comingSoon
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {t("no")}
              </Button>
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="border p-3 rounded-lg flex items-center justify-center relative cursor-pointer">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleThumbnailChange}
            />
            {thumbnailPreview ? (
              <div className="relative">
                <img
                  src={thumbnailPreview}
                  alt={t("thumbnail")}
                  className="h-40 w-40 object-cover rounded-lg"
                />
                <X
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                  size={16}
                  onClick={removeThumbnail}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <ImagePlus size={40} />
                <span>{t("upload_thumbnail")}</span>
              </div>
            )}
          </div>

          {/* Additional Images Upload */}
          <div className="border p-3 rounded-lg flex flex-col items-center relative cursor-pointer">
            <input
              type="file"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImagesChange}
            />
            {imagePreviews.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {imagePreviews.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`${t("product")} ${index}`}
                      className="h-20 w-20 object-cover rounded-lg cursor-pointer"
                    />
                    <X
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                      size={16}
                      onClick={() => removeImage(index)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <ImagePlus size={40} />
                <span>{t("upload_images")}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            className="w-full flex items-center justify-center gap-2"
            color="blue"
            disabled={editLoading}
          >
            {editLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                {t("loading")}
              </>
            ) : (
              <>
                <Upload size={18} /> {t("edit_product")}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
