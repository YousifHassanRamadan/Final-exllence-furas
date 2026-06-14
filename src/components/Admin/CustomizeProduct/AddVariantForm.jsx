import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  addVariant,
  resetVariantState,
} from "../../../reduxSystem/slices/addVariantSlice";

const AddVariantForm = ({ item, setActiveForm }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isVariantAdded, loading, error } = useSelector(
    (state) => state.variantState
  );

  const { isRTL } = useSelector((state) => state.RTLState);

  const sizes = ["M", "L", "XL", "2XL", "3XL", "4XL"];

  const validationSchema = Yup.object({
    color: Yup.string().required(t("color_required")),
    size: Yup.string().required(t("size_required")),
    stock: Yup.number().required(t("stock_required")).min(1, t("stock_min")),
    price: Yup.number().required(t("price_required")).min(0, t("price_min")),
  });

  const formik = useFormik({
    initialValues: {
      productId: item._id,
      color: "",
      size: "",
      stock: "",
      price: "",
      images: [],
    },
    validationSchema,
    onSubmit: (values) => {
      const variantObj = { ...values, color: values.color.toLowerCase() };
      dispatch(addVariant(variantObj));
    },
  });

  useEffect(() => {
    dispatch(resetVariantState());
  }, []);

  useEffect(() => {
    if (isVariantAdded) {
      Swal.fire({
        icon: "success",
        title: t("success"),
        text: t("variant_added_success"),
      });
      dispatch(resetVariantState());
      setActiveForm(null);
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: error || t("something_wrong"),
      });
      dispatch(resetVariantState());
    }
  }, [isVariantAdded, error, dispatch, setActiveForm, t]);

  return (
    <div className={`relative p-6 bg-white shadow-lg rounded-lg`}>
      <button
        className={`absolute top-3 ${
          isRTL ? "left-3" : "right-3"
        }  text-white bg-red-500 rounded-full p-1`}
        onClick={() => setActiveForm(null)}
      >
        <IoClose size={24} />
      </button>

      <h2 className={`text-xl font-semibold mb-4 text-[#284980] `}>
        {t("add_variant")}
      </h2>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
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

        <select
          name="size"
          value={formik.values.size}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border rounded-lg p-2 w-full"
        >
          <option value="">{t("select_size")}</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {formik.touched.size && formik.errors.size && (
          <p className="text-red-500">{formik.errors.size}</p>
        )}

        <input
          type="number"
          name="stock"
          placeholder={t("stock")}
          value={formik.values.stock}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border rounded-lg p-2 w-full"
        />
        {formik.touched.stock && formik.errors.stock && (
          <p className="text-red-500">{formik.errors.stock}</p>
        )}

        <input
          type="number"
          name="price"
          placeholder={t("price")}
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border rounded-lg p-2 w-full"
        />
        {formik.touched.price && formik.errors.price && (
          <p className="text-red-500">{formik.errors.price}</p>
        )}

        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={(event) => {
            const newFiles = Array.from(event.target.files);
            formik.setFieldValue("images", [
              ...formik.values.images,
              ...newFiles,
            ]);
          }}
          className="border rounded-lg p-2 w-full"
        />

        <div className="flex flex-wrap gap-2">
          {formik.values.images.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className="w-20 h-20 object-cover rounded"
              />
              <button
                type="button"
                className="absolute -top-1 -right-1 bg-red-500 text-white p-[2px] rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition"
                onClick={() => {
                  const updatedImages = formik.values.images.filter(
                    (_, i) => i !== index
                  );
                  formik.setFieldValue("images", updatedImages);
                }}
              >
                <IoClose size={14} />
              </button>
            </div>
          ))}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#284980] text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
        >
          {loading ? t("adding") : t("add_variant")}
        </button>
      </form>
    </div>
  );
};

export default AddVariantForm;
