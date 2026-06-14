import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { placeOrder } from "../../reduxSystem/slices/addPlaceOrderSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../reduxSystem/slices/clearUserCartSlice";
import { useTranslation } from "react-i18next";

const PlaceOrder = ({ setIsPlaceOrderOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      country: "",
      streetAddress: "",
      homeAddress: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      landmark: "",
    },
    validationSchema: Yup.object({
      country: Yup.string().required(t("country_required")),
      streetAddress: Yup.string().required(t("street_required")),
      homeAddress: Yup.string().required(t("home_required")),
      city: Yup.string().required(t("city_required")),
      state: Yup.string().required(t("state_required")),
      zipCode: Yup.string()
        .matches(/^\d{5}$/, t("zipCode_digits"))
        .required(t("zip_required")),
      phone: Yup.string()
        .matches(/^\d{11}$/, t("phone_digits"))
        .required(t("phone_required")),
      landmark: Yup.string().required(t("landmark_required")),
    }),
    onSubmit: (values) => {
      const paymentMethod = "cod";
      const { phone, ...addressWithoutPhone } = values;

      const billingDetails = {
        phone,
        address: addressWithoutPhone,
        paymentMethod,
      };

      dispatch(placeOrder(billingDetails));

      Swal.fire({
        icon: "success",
        title: t("order_placed_success"),
        text: t("order_placed_success_text"),
        confirmButtonColor: "#284980",
        timer: 3000,
        timerProgressBar: true,
      });

      dispatch(clearCart());

      navigate("/my-account/orders");

      setIsPlaceOrderOpen(false);
    },
  });

  const inputFields = [
    { name: "country", label: t("country"), type: "text", required: true },
    {
      name: "streetAddress",
      label: t("street_address"),
      type: "text",
      required: true,
    },
    {
      name: "homeAddress",
      label: t("home_address"),
      type: "text",
      required: true,
    },
    { name: "city", label: t("city"), type: "text", required: true },
    { name: "state", label: t("state"), type: "text", required: true },
    { name: "zipCode", label: t("zip_code"), type: "text", required: true },
    { name: "phone", label: t("phone_number"), type: "tel", required: true },
    { name: "landmark", label: t("landmark"), type: "text", required: true },
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className=" bg-transparent bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#284980] to-[#1e3a6f] px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {t("billing_details")}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              {t("please_fill_delivery")}
            </p>
          </div>
          <button
            onClick={() => setIsPlaceOrderOpen(false)}
            className="p-2 text-white bg-red-500 hover:bg-opacity-20 rounded-full transition-all duration-200 hover:scale-110"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Form Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {inputFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-semibold text-[#284980] mb-2"
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>

                  <div className="relative">
                    <Input
                      id={field.name}
                      variant="outlined"
                      type={field.type}
                      placeholder={t("enter_your", {
                        field: field.label.toLowerCase(),
                      })}
                      className="w-full transition-all duration-200 focus:scale-[1.02]"
                      {...formik.getFieldProps(field.name)}
                      error={
                        formik.touched[field.name] &&
                        Boolean(formik.errors[field.name])
                      }
                    />
                  </div>

                  {/* Error Message */}
                  {formik.touched[field.name] && formik.errors[field.name] && (
                    <div className="flex items-center mt-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      <p className="text-red-500 text-xs font-medium">
                        {formik.errors[field.name]}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Form Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="button"
                  variant="outlined"
                  color="gray"
                  onClick={() => setIsPlaceOrderOpen(false)}
                  className="w-full sm:w-auto order-2 sm:order-1"
                >
                  {t("cancel")}
                </Button>

                <Button
                  type="submit"
                  className="w-full sm:flex-1 bg-gradient-to-r from-[#284980] to-[#1e3a6f] hover:from-[#1e3a6f] hover:to-[#284980] transition-all duration-300 transform hover:scale-[1.02] shadow-lg order-1 sm:order-2"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {t("processing")}
                    </div>
                  ) : (
                    t("place_order")
                  )}
                </Button>
              </div>

              {/* Form Summary */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-[#284980] font-medium">
                  📋 {t("review_before_order")}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {t("all_fields_required")}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
