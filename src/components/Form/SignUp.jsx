import React, { useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { signUpUser, resetSignUp } from "../../reduxSystem/slices/authSlice";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { handelRTL } from "../../reduxSystem/slices/handleRTLSlice";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
// min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const SignUp = ({
  showPassword,
  togglePasswordVisibility,
  showConfirmPassword,
  toggleConfirmPasswordVisibility,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signUpErr, errorMsg, signUpStatus, loading } = useSelector(
    (state) => state.authState
  );

  // تنظيف حالة التسجيل عند تحميل المكون
  useEffect(() => {
    return () => {
      dispatch(resetSignUp());
    };
  }, [dispatch]);

  const { isRTL } = useSelector((state) => state.RTLState);

  useEffect(() => {
    // تحقق من أن errorMsg ليس null أو undefined قبل استخدامه
    if (signUpErr === true && errorMsg) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMsg,
      });
    } else if (signUpStatus === "success" && errorMsg === "noError") {
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Your account has been created successfully",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/register");
        } else {
          dispatch(resetSignUp());
        }
      });
    }
  }, [signUpErr, signUpStatus, errorMsg, navigate, dispatch, t]);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    dirty,
    resetForm,
  } = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      password: "",
      confirmPass: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t("valid_email")).required(t("email_required")),

      fname: Yup.string()
        .required(t("fname_required"))
        .min(3, t("username_min"))
        .max(20, t("username_max"))
        .matches(/^[\p{L}0-9_]+$/u, t("username_letters_numbers")),

      lname: Yup.string()
        .required(t("lname_required"))
        .min(3, t("username_min"))
        .max(20, t("username_max"))
        .matches(/^[\p{L}0-9_]+$/u, t("username_letters_numbers")),

      phone: Yup.string()
        .required(t("phone_required"))
        .matches(/^[0-9]{6,15}$/, t("phone_digits")),

      password: Yup.string()
        .required(t("password_required"))
        .min(8, t("password_min"))
        .matches(passwordRules, {
          message: t("password_strong"),
        }),

      confirmPass: Yup.string()
        .required(t("confirm_password_required"))
        .oneOf([Yup.ref("password"), null], t("passwords_match")),
    }),
    onSubmit: (values) => {
      const data = {
        fname: values.fname,
        lname: values.lname,
        email: values.email,
        phone: values.phone,
        password: values.password,
      };
      dispatch(signUpUser(data));
    },
  });

  console.log("i18n.language signup", i18n.language);

  // Check if all required fields are filled
  const isFormValid = () => {
    return (
      values.fname &&
      values.fname.trim() !== "" &&
      values.lname &&
      values.lname.trim() !== "" &&
      values.email &&
      values.email.trim() !== "" &&
      values.phone &&
      values.phone !== "" &&
      values.password &&
      values.password.trim() !== "" &&
      values.confirmPass &&
      values.confirmPass.trim() !== "" &&
      isValid
    );
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-4">
        {/*First Name */}
        <div className="mb-2">
          <label
            htmlFor="fname"
            className={`block mb-1 text-sm font-medium ${
              errors.fname && touched.fname ? "text-red-600" : "text-[#284980]"
            } ${isRTL ? "text-right" : "text-left"}`}
          >
            {t("userFname")} <span className="text-red-600">*</span>
          </label>
          <input
            dir={isRTL ? "rtl" : "ltr"}
            id="fname"
            placeholder={"Khalid"}
            value={values.fname || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-4 border-b-2 ${
              errors.fname && touched.fname
                ? "border-red-600 text-red-600"
                : "border-[#284980]"
            } focus:outline-none focus:ring-0  ${
              isRTL ? "text-right" : "text-left"
            }`}
          />
          {errors.fname && touched.fname && (
            <div
              className={`text-red-600 mt-1 flex items-center text-sm ${
                isRTL ? "justify-start" : "justify-start"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
              <span>{errors.fname}</span>
            </div>
          )}
        </div>

        {/*Last Name */}
        <div className="mb-2">
          <label
            htmlFor="lname"
            className={`block mb-1 text-sm font-medium ${
              errors.lname && touched.lname ? "text-red-600" : "text-[#284980]"
            } ${isRTL ? "text-right" : "text-left"}`}
          >
            {t("userLname")} <span className="text-red-600">*</span>
          </label>
          <input
            dir={isRTL ? "rtl" : "ltr"}
            id="lname"
            placeholder={"Mohamed"}
            value={values.lname || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-4 border-b-2 ${
              errors.lname && touched.lname
                ? "border-red-600 text-red-600"
                : "border-[#284980]"
            } focus:outline-none focus:ring-0 ${
              isRTL ? "text-right" : "text-left"
            }`}
          />
          {errors.lname && touched.lname && (
            <div
              className={`text-red-600 mt-1 flex items-center text-sm ${
                isRTL ? "justify-start" : "justify-start"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
              <span className={isRTL ? "text-right" : "text-left"}>
                {errors.lname}
              </span>
            </div>
          )}
        </div>

        {/*Phone Number */}
        <div className="mb-2">
          <label
            htmlFor="phone"
            className={`block mb-1 text-sm font-medium ${
              errors.phone && touched.phone ? "text-red-600" : "text-[#284980]"
            } ${isRTL ? "text-right" : "text-left"}`}
          >
            {t("phone")} <span className="text-red-600">*</span>
          </label>
          <input
            dir={isRTL ? "rtl" : "ltr"}
            type="number"
            id="phone"
            placeholder={"01147267118"}
            value={values.phone || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-4 border-b-2 ${
              errors.phone && touched.phone
                ? "border-red-600 text-red-600"
                : "border-[#284980]"
            } focus:outline-none focus:ring-0 ${
              isRTL ? "text-right" : "text-left"
            }`}
          />
          {errors.phone && touched.phone && (
            <div
              className={`text-red-600 mt-1 flex items-center text-sm ${
                isRTL ? "justify-start" : "justify-start"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
              <span className={isRTL ? "text-right" : "text-left"}>
                {errors.phone}
              </span>
            </div>
          )}
        </div>

        {/*Email*/}
        <div className="my-2">
          <label
            htmlFor="email"
            className={`block mb-1 text-sm font-medium ${
              errors.email && touched.email ? "text-red-600" : "text-[#284980]"
            } ${isRTL ? "text-right" : "text-left"}`}
          >
            {t("email")} <span className="text-red-600">*</span>
          </label>
          <input
            dir={isRTL ? "rtl" : "ltr"}
            id="email"
            placeholder={"yourEmail@gmail.com"}
            type="email"
            value={values.email || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-4 border-b-2 ${
              errors.email && touched.email
                ? "border-red-600 text-red-600"
                : "border-[#284980]"
            } focus:outline-none focus:ring-0 ${
              isRTL ? "text-right" : "text-left"
            }`}
          />
          {errors.email && touched.email && (
            <div
              className={`text-red-600 mt-1 flex items-center text-sm ${
                isRTL ? "justify-start" : "justify-start"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
              <span className={isRTL ? "text-right" : "text-left"}>
                {errors.email}
              </span>
            </div>
          )}
        </div>

        {/*Password*/}
        <div className="my-2">
          <label
            htmlFor="password"
            className={`block mb-1 text-sm font-medium ${
              errors.password && touched.password
                ? "text-red-600"
                : "text-[#284980]"
            } ${isRTL ? "text-right" : "text-left"}`}
          >
            {t("password")} <span className="text-red-600">*</span>
          </label>
          <div className="flex relative">
            <input
              dir={isRTL ? "rtl" : "ltr"}
              id="password"
              placeholder={t("enterYourPassword")}
              type={showPassword ? "password" : "text"}
              value={values.password || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-4 border-b-2 ${
                errors.password && touched.password
                  ? "border-red-600 text-red-600"
                  : "border-[#284980]"
              } focus:outline-none focus:ring-0 ${
                isRTL ? "pl-10 pr-3" : "pr-10 pl-3"
              }`}
            />
            <span
              className={`absolute ${
                isRTL ? "left-2" : "right-2"
              }  top-1/2 transform -translate-y-1/2 cursor-pointer`}
              onClick={() => togglePasswordVisibility()}
            >
              {showPassword ? (
                <FiEyeOff aria-label={t("showPassword")} />
              ) : (
                <FiEye aria-label={t("hidePassword")} />
              )}
            </span>
          </div>
          {errors.password && touched.password && (
            <div
              className={`text-red-600 mt-1 flex items-center text-sm ${
                isRTL ? "justify-start" : "justify-start"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
              <span className={isRTL ? "text-right" : "text-left"}>
                {errors.password}
              </span>
            </div>
          )}
        </div>

        {/*Check Password*/}
        <div className="my-2">
          <label
            htmlFor="confirmPass"
            className={`block mb-1 text-sm font-medium ${
              errors.confirmPass && touched.confirmPass
                ? "text-red-600"
                : "text-[#284980]"
            } ${isRTL ? "text-right" : "text-left"}`}
          >
            {t("confirmPassword")} <span className="text-red-600">*</span>
          </label>
          <div className="flex relative">
            <input
              dir={isRTL ? "rtl" : "ltr"}
              id="confirmPass"
              placeholder={t("enterYourPasswordAgain")}
              type={showConfirmPassword ? "password" : "text"}
              value={values.confirmPass || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-4 border-b-2 ${
                errors.confirmPass && touched.confirmPass
                  ? "border-red-600 text-red-600"
                  : "border-[#284980]"
              } focus:outline-none focus:ring-0  ${
                isRTL ? "pl-10 pr-3" : "pr-10 pl-3"
              }`}
            />
            <span
              className={`absolute ${
                isRTL ? "left-2" : "right-2"
              }  top-1/2 transform -translate-y-1/2 cursor-pointer`}
              onClick={() => toggleConfirmPasswordVisibility()}
            >
              {showConfirmPassword ? (
                <FiEyeOff aria-label={t("showConfirmPassword")} />
              ) : (
                <FiEye aria-label={t("hideConfirmPassword")} />
              )}
            </span>
          </div>
          {errors.confirmPass && touched.confirmPass && (
            <div
              className={`text-red-600 mt-1 flex items-center text-sm ${
                isRTL ? "justify-start" : "justify-start"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ${isRTL ? "ml-1" : "mr-1"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
              <span className={isRTL ? "text-right" : "text-left"}>
                {errors.confirmPass}
              </span>
            </div>
          )}
        </div>

        <button
          disabled={!isFormValid() || loading}
          type="submit"
          className={`p-3 mt-4 text-white font-medium rounded text-sm ${
            isFormValid() && !loading
              ? "bg-[#284980] cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Please Wait..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
