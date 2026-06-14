import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useEffect } from "react";
import {
  addDiscount,
  resetDiscountState,
} from "../../../reduxSystem/slices/addOfferSlice";
import { useTranslation } from "react-i18next";

const AddOfferForm = ({ item, setActiveForm }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isRTL } = useSelector((state) => state.RTLState);

  const { isDiscountAdded, loading, error } = useSelector(
    (state) => state.discountState
  );

  const validationSchema = Yup.object({
    discountPercentage: Yup.number()
      .required(t("discount_required"))
      .min(1, t("discount_min"))
      .max(100, t("discount_max")),
    startDate: Yup.date().required(t("start_date_required")),
    endDate: Yup.date().required(t("end_date_required")),
  });

  const formik = useFormik({
    initialValues: {
      productId: item._id,
      discountPercentage: "",
      startDate: "",
      endDate: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const now = new Date();

      const formatDate = (date, time = "00:00") => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0"); // يوم بصيغة 2-digit
        const month = String(d.getMonth() + 1).padStart(2, "0"); // شهر بصيغة 2-digit
        const year = d.getFullYear();
        return `${day}-${month}-${year} ${time}`;
      };

      // تنسيق الحقول قبل الإرسال
      const formattedStartDate = formatDate(
        values.startDate,
        `${now.getHours()}:${now.getMinutes()}`
      );
      const formattedEndDate = formatDate(values.endDate, "23:59");

      const updatedValues = {
        productId: values.productId,
        discountPercentage: values.discountPercentage,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };

      // console.log("updated values", updatedValues);
      dispatch(addDiscount(updatedValues));
    },
  });

  useEffect(() => {
    dispatch(resetDiscountState());
  }, []);

  useEffect(() => {
    if (isDiscountAdded) {
      Swal.fire({
        icon: "success",
        title: t("success"),
        text: t("offer_added_success"),
      });
      dispatch(resetDiscountState());
      setActiveForm(null);
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: t("error"),
        text: t("offer_start_day_error"),
      });
      dispatch(resetDiscountState());
    }
  }, [isDiscountAdded, error, dispatch, setActiveForm, t]);

  return (
    <div className="relative p-6 bg-white shadow-lg rounded-lg">
      <button
        className={`absolute top-3 ${
          isRTL ? "left-3" : "right-3"
        }  text-white bg-red-500 rounded-full p-1`}
        onClick={() => setActiveForm(null)}
      >
        <IoClose size={24} />
      </button>

      <h2 className={`text-xl font-semibold mb-4 text-green-600 `}>
        {t("add_offer")}
      </h2>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <input
          type="number"
          name="discountPercentage"
          placeholder={t("discount_percent")}
          {...formik.getFieldProps("discountPercentage")}
          className="border rounded-lg p-2 w-full"
        />
        {formik.touched.discountPercentage &&
          formik.errors.discountPercentage && (
            <div className="text-red-500 text-sm">
              {formik.errors.discountPercentage}
            </div>
          )}

        <input
          type="date"
          name="startDate"
          {...formik.getFieldProps("startDate")}
          className="border rounded-lg p-2 w-full"
        />
        {formik.touched.startDate && formik.errors.startDate && (
          <div className="text-red-500 text-sm">{formik.errors.startDate}</div>
        )}

        <input
          type="date"
          name="endDate"
          {...formik.getFieldProps("endDate")}
          className="border rounded-lg p-2 w-full"
        />
        {formik.touched.endDate && formik.errors.endDate && (
          <div className="text-red-500 text-sm">{formik.errors.endDate}</div>
        )}

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          {t("add_offer")}
        </button>
      </form>
    </div>
  );
};

export default AddOfferForm;
