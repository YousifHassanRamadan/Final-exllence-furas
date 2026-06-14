import { Input } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../reduxSystem/slices/editProfileSlice";
import { fetchUserData } from "../reduxSystem/slices/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  changePassword,
  clearPasswordState,
} from "../reduxSystem/slices/editPasswordSlice";
import { Eye, EyeOff } from "lucide-react"; // أيقونات العين
import Swal from "sweetalert2";
import { MdVerified } from "react-icons/md";
import { verifyAccount } from "../reduxSystem/slices/verifyAccountSlice";
import { LocalStorageUtils } from "../utils/localStorageUtils";
import { toast } from "react-toastify";

const EditAccountPage = () => {
  const { t } = useTranslation();

  const { isRTL } = useSelector((state) => state.RTLState);

  const dispatch = useDispatch();

  const { isProfileEdited, isEditProfLoading } = useSelector(
    (state) => state.userSliceState
  );

  const passwordState = useSelector((state) => state.changePasswordState || {});
  const {
    isLoading: isPasswordLoading,
    isSuccess: isPasswordSuccess,
    isError: isPasswordError,
    errorMessage,
  } = passwordState;

  const { loading } = useSelector((state) => state.verifyAccountState);

  const { userData } = useSelector((state) => state.authState);

  useEffect(() => {
    const token = LocalStorageUtils.getAccessToken();
    dispatch(fetchUserData(token));
  }, [isProfileEdited]);

  // 🔹 نموذج البيانات الشخصية
  const personalFormik = useFormik({
    initialValues: {
      fname: userData?.fname || "",
      lname: userData?.lname || "",
      phone: userData?.phone || "",
      email: userData?.email || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      fname: Yup.string().required(t("first_name_required")),
      lname: Yup.string().required(t("last_name_required")),
      phone: Yup.string().required(t("phone_required")),
      email: Yup.string()
        .email(t("invalid_email"))
        .required(t("email_required")),
    }),
    onSubmit: (values) => {
      const updatedFields = {};
      Object.keys(values).forEach((key) => {
        if (values[key] !== userData[key]) {
          updatedFields[key] = values[key];
        }
      });

      if (Object.keys(updatedFields).length > 0) {
        dispatch(updateUserInfo(updatedFields));
        Swal.fire({
          icon: "success",
          title: t("updated_success"),
          text: t("changes_saved"),
          confirmButtonColor: "#284980",
        });
      } else {
        Swal.fire({
          icon: "info",
          title: t("no_changes"),
          text: t("no_data_modified"),
          confirmButtonColor: "#3085d6",
        });
      }
    },
  });

  // 🔹 نموذج تغيير كلمة المرور
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(t("current_password_required")),
      newPassword: Yup.string()
        .min(6, t("password_min_length"))
        .required(t("new_password_required")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], t("passwords_must_match"))
        .required(t("confirm_password_required")),
    }),
    onSubmit: (values) => {
      dispatch(changePassword(values));
    },
  });

  // 🔹 حالة إظهار/إخفاء كلمة المرور
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    if (isPasswordSuccess) {
      toast.success(
        t("password_changed_successfully") || "Password changed successfully!"
      );
      passwordFormik.resetForm();
      // تنظيف الحالة بعد 3 ثوانٍ
      setTimeout(() => {
        dispatch(clearPasswordState());
      }, 3000);
    }

    if (isPasswordError) {
      toast.error(
        errorMessage ||
          t("password_change_failed") ||
          "Failed to change password!"
      );
      // تنظيف الحالة بعد 3 ثوانٍ
      setTimeout(() => {
        dispatch(clearPasswordState());
      }, 3000);
    }
  }, [isPasswordSuccess, isPasswordError, errorMessage, t, dispatch]);

  return (
    <div className="bg-[#f2f2f2] w-full p-16">
      <div className="header">
        <p className="text-3xl font-semibold text-[#284980]">
          {t("editAccount")}
        </p>
        {!userData?.isConfirmed && (
          <div
            className="verify mt-2 flex items-center cursor-pointer"
            onClick={() => {
              dispatch(verifyAccount());
              toast.success("we sent you a verification email");
            }}
          >
            <MdVerified className=" text-[#F0B100]" />
            <p className=" text-[#F0B100] ml-1">Verify Your Account</p>
          </div>
        )}
      </div>

      <div className="w-full opacity-[8%] h-[2px] rounded bg-gray-500 px-9 mt-5 mb-9"></div>

      {/* ✅ فورم المعلومات الشخصية */}
      <form onSubmit={personalFormik.handleSubmit}>
        <div className="inputs flex md:justify-between md:flex-row flex-col">
          <div className="firstName md:w-[40%] w-full">
            <p className="text-lg text-[#284980] font-semibold mb-2">
              {t("firstName")}
            </p>
            <Input
              name="fname"
              variant="outlined"
              placeholder={t("enterYourFirstName")}
              className="border-[#284980] focus:outline-none focus:ring-0"
              {...personalFormik.getFieldProps("fname")}
            />
            {personalFormik.touched.fname && personalFormik.errors.fname && (
              <p className="text-red-500 text-sm mt-2">
                {personalFormik.errors.fname}
              </p>
            )}
          </div>

          <div className="lastName md:w-[40%] w-full md:mt-0 mt-8 mb-4">
            <p className="text-lg text-[#284980] font-semibold mb-2">
              {t("lastName")}
            </p>
            <Input
              name="lname"
              variant="outlined"
              placeholder={t("enterYourLastName")}
              className="border-[#284980] focus:outline-none focus:ring-0"
              {...personalFormik.getFieldProps("lname")}
            />
            {personalFormik.touched.lname && personalFormik.errors.lname && (
              <p className="text-red-500 text-sm mt-2">
                {personalFormik.errors.lname}
              </p>
            )}
          </div>
        </div>

        <div className="emailAddress mt-[4%]">
          <p className="text-lg text-[#284980] font-semibold mb-2">
            {t("emailAddress")}
          </p>
          <Input
            name="email"
            variant="outlined"
            placeholder={t("enterYourEmailAddress")}
            className="border-[#284980] focus:outline-none focus:ring-0"
            {...personalFormik.getFieldProps("email")}
          />
          {personalFormik.touched.email && personalFormik.errors.email && (
            <p className="text-red-500 text-sm mt-2">
              {personalFormik.errors.email}
            </p>
          )}
        </div>

        <div className="phone mt-[4%]">
          <p className="text-lg text-[#284980] font-semibold mb-2">
            {t("phone")}
          </p>
          <Input
            name="phone"
            variant="outlined"
            placeholder={t("enterYourPhoneNumber")}
            className="border-[#284980] focus:outline-none focus:ring-0"
            {...personalFormik.getFieldProps("phone")}
          />
          {personalFormik.touched.phone && personalFormik.errors.phone && (
            <p className="text-red-500 text-sm mt-2">
              {personalFormik.errors.phone}
            </p>
          )}
        </div>

        <div className="btn mt-9 flex sm:justify-start justify-center">
          <button
            type="submit"
            className="bg-yellow-500 text-[#284980] py-2 px-4 rounded shadow hover:text-white hover:bg-[#284980] transition duration-200"
          >
            {t("saveChanges")}
          </button>
        </div>
      </form>

      <div className="w-full opacity-[8%] h-[2px] rounded bg-gray-500 px-9 mt-10 mb-9"></div>

      {/* ✅ فورم تغيير كلمة المرور */}
      <form onSubmit={passwordFormik.handleSubmit}>
        <div className="changepassword mt-9">
          <p className="text-lg text-[#284980] font-semibold">
            {t("passwordChange")}
          </p>
        </div>

        {["currentPassword", "newPassword", "confirmPassword"].map(
          (field, index) => (
            <div key={index} className="relative mt-[5%]">
              <p className="text-lg text-[#284980] font-semibold mb-2">
                {t(field)}
              </p>
              <Input
                type={showPassword[field] ? "text" : "password"}
                name={field}
                variant="outlined"
                placeholder={t(
                  `enterYour${field.charAt(0).toUpperCase() + field.slice(1)}`
                )}
                className="border-[#284980] focus:outline-none focus:ring-0 pr-10"
                {...passwordFormik.getFieldProps(field)}
              />
              <button
                type="button"
                className={`absolute top-3 ${
                  isRTL ? "left-3" : "right-3"
                }  text-gray-500`}
                onClick={() => togglePasswordVisibility(field)}
              >
                {showPassword[field] ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {passwordFormik.touched[field] &&
                passwordFormik.errors[field] && (
                  <p className="text-red-500 text-sm mt-2">
                    {passwordFormik.errors[field]}
                  </p>
                )}
            </div>
          )
        )}

        <div className="btn mt-9 flex sm:justify-start justify-center">
          <button
            type="submit"
            className="bg-yellow-500 text-[#284980] py-2 px-4 rounded shadow hover:text-white hover:bg-[#284980] transition duration-200"
          >
            {t("change_password")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAccountPage;
