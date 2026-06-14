import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@mui/material";
import LogIn from "../components/Form/LogIn";
import SignUp from "../components/Form/SignUp";
import i18n from "../i18n";
import { FiLogIn } from "react-icons/fi";
import { BiSolidEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { handelRTL } from "../reduxSystem/slices/handleRTLSlice";

const LogInAndSignUp = () => {
  const { isRTL } = useSelector((state) => state.RTLState);

  const dispatch = useDispatch();

  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordLogIn, setShowPasswordLogIn] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordLogInVisibility = () => {
    setShowPasswordLogIn((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  console.log("isRTL page", isRTL);

  console.log("document.dir", document.dir);

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  return (
    <Container maxWidth="md" className="mx-auto container my-16">
      <div className="bg-gradient-to-r from-[#284980] to-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header Section - Fixed for RTL */}
        <div
          className={`flex justify-between items-center px-8 py-6 text-white ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <h2
            className={`text-2xl font-bold ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {t(activeTab === "signup" ? "signUp" : "logIn")}
          </h2>
          <div className="bg-white/20 p-3 rounded-full">
            {activeTab === "signup" ? (
              <BiSolidEdit
                className="h-6 w-6 text-[#284980]"
                aria-label={t("signUpIcon")}
              />
            ) : (
              <FiLogIn
                className="h-6 w-6 text-[#284980]"
                aria-label={t("logInIcon")}
              />
            )}
          </div>
        </div>

        {/* Tab Navigation - Fixed for RTL */}
        <div
          className={`flex justify-around bg-white/10 backdrop-blur-sm ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <button
            className={`w-1/2 py-4 font-medium transition-colors duration-300 ${
              activeTab === "signup"
                ? "text-white bg-[#284980]"
                : "text-gray-200 hover:bg-white/10"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            {t("signUp")}
          </button>
          <button
            className={`w-1/2 py-4 font-medium transition-colors duration-300 ${
              activeTab === "login"
                ? "text-white bg-[#284980]"
                : "text-gray-200 hover:bg-white/10"
            }`}
            onClick={() => setActiveTab("login")}
          >
            {t("logIn")}
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 min-h-96">
          {activeTab === "signup" && (
            <SignUp
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              showConfirmPassword={showConfirmPassword}
              toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
            />
          )}

          {activeTab === "login" && (
            <LogIn
              showPasswordLogIn={showPasswordLogIn}
              togglePasswordLogInVisibility={togglePasswordLogInVisibility}
            />
          )}
        </div>

        {/* Footer - Fixed for RTL */}
        <div
          className={`bg-gray-50 p-4 text-center text-gray-500 text-sm border-t border-gray-200`}
        >
          {activeTab === "signup" ? (
            <span className="mx-2">{t("already_have_account")}</span>
          ) : (
            <span className="mx-2">{t("dont_have_account")}</span>
          )}
          <button
            className={`text-[#284980] font-medium hover:underline ${
              isRTL ? "me-2" : "ms-2"
            }`}
            onClick={() =>
              setActiveTab(activeTab === "signup" ? "login" : "signup")
            }
          >
            {activeTab === "signup" ? t("logIn") : t("signUp")}
          </button>
        </div>
      </div>
    </Container>
  );
};

export default LogInAndSignUp;
