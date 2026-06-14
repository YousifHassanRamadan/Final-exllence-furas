import React from "react";
import { useSelector } from "react-redux";
import { IoPerson } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LogInOrMyAcc = ({ closeDrawerRight, isRTL }) => {
  const { isLogged } = useSelector((state) => state.authState);
  const { userData } = useSelector((state) => state.authState);
  const { t } = useTranslation();

  return (
    <div className={`flex items-center gap-3 ${isRTL ? "px-4" : "px-4"} py-2`}>
      <IoPerson className="text-[#f8c530] text-xl" aria-label="User Icon" />
      {isLogged ? (
        <Link
          to="/my-account"
          className="text-white text-base hover:text-[#f8c530] transition"
          onClick={() => closeDrawerRight()}
        >
          {isRTL ? "حسابي" : "My Account"}
          {!userData?.isConfirmed && (
            <MdVerified
              className={`inline ${isRTL ? "mr-2" : "ml-2"} text-[#f8c530]`}
            />
          )}
        </Link>
      ) : (
        <Link
          to="/register"
          className="text-white text-base hover:text-[#f8c530] transition"
          onClick={() => closeDrawerRight()}
        >
          {isRTL ? "تسجيل الدخول" : "Log in"}
        </Link>
      )}
    </div>
  );
};

export default LogInOrMyAcc;
