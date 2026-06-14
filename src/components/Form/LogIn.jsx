import React, { useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useFormik } from "formik";
import { BasicSchema } from "../../schemas";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "../../reduxSystem/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { handelRTL } from "../../reduxSystem/slices/handleRTLSlice";

const LogIn = ({ showPasswordLogIn, togglePasswordLogInVisibility }) => {
  const { t } = useTranslation();

  const { isRTL } = useSelector((state) => state.RTLState);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { token, logInError, errorMsg, loading, logInLoading } = useSelector(
    (state) => state.authState,
  );

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues: {
      emailLogIn: "",
      passwordLogIn: "",
    },
    onSubmit: (values) => {
      let data = {
        email: values.emailLogIn,
        password: values.passwordLogIn,
      };
      // console.log("data", data);

      dispatch(logInUser(data));
    },
  });

  useEffect(() => {
    if (token) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate("/");
    }
  }, [token, navigate]);

  const isFormEmpty = !values.emailLogIn || !values.passwordLogIn;

  const isFormValid = () => {
    return (
      values.emailLogIn &&
      values.emailLogIn.trim() !== "" &&
      values.passwordLogIn &&
      values.passwordLogIn.trim() !== "" &&
      isValid
    );
  };

  console.log("i18n.language login", i18n.language);

  return (
    <div>
      <div className="p-0">
        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-6">
          <div>
            {/* Title for Email */}
            <h6
              className={`text-[#284980] mb-2 font-medium text-base ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("email")}
            </h6>
            <div className="relative">
              <input
                dir={isRTL ? "rtl" : "ltr"}
                id="emailLogIn"
                placeholder={t("enterYourEmail")}
                type="email"
                value={values.emailLogIn}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border-b-2 ${
                  errors.emailLogIn && touched.emailLogIn
                    ? "border-red-600 text-red-600"
                    : "border-[#284980]"
                } ${
                  isRTL ? "text-right" : "text-left"
                } focus:outline-none focus:ring-0 p-3`}
              />
            </div>

            {errors.emailLogIn && touched.emailLogIn && (
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
                  {errors.emailLogIn}
                </span>
              </div>
            )}
          </div>

          <div className="my-6">
            <h6
              className={`text-[#284980] mb-2 font-medium text-base ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("password")}
            </h6>
            <div className="flex relative">
              <input
                id="passwordLogIn"
                placeholder={t("enterYourPassword")}
                type={showPasswordLogIn ? "password" : "text"}
                value={values.passwordLogIn}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full border-b-2 ${
                  errors.passwordLogIn && touched.passwordLogIn
                    ? "border-red-600 text-red-600"
                    : "border-[#284980]"
                } focus:outline-none focus:ring-0 p-3 ${
                  isRTL ? "text-right pl-10 pr-3" : "text-left pr-10 pl-3"
                }`}
                dir={isRTL ? "rtl" : "ltr"}
              />
              <span
                className={`absolute ${
                  isRTL ? "left-2" : "right-2"
                } top-1/2 transform -translate-y-1/2 cursor-pointer`}
                onClick={togglePasswordLogInVisibility}
              >
                {showPasswordLogIn ? (
                  <FiEyeOff aria-label={t("showPassword")} />
                ) : (
                  <FiEye aria-label={t("hidePassword")} />
                )}
              </span>
            </div>

            {errors.passwordLogIn && touched.passwordLogIn && (
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
                  {errors.passwordLogIn}
                </span>
              </div>
            )}
          </div>

          {/* Submit Button */}

          <button
            disabled={!isFormValid() || logInLoading}
            type="submit"
            className={`p-3 mt-4 text-white font-medium rounded text-sm ${
              isFormValid() && !logInLoading
                ? "bg-[#284980] cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {logInLoading ? "Loading..." : t("logIn")}
          </button>

          {/* Error message animation */}
          {!logInLoading && errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`text-red-600 mt-2 text-center text-sm `}>
                {errorMsg}
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LogIn;
