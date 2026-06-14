import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ContactDrawer = ({ closeDrawerRight, isRTL }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`w-full bg-[#284980] text-white py-1 ${
        isRTL ? "pr-4" : "pl-4"
      }`}
    >
      {/* Clickable Header */}
      <Link to={"/contact"} onClick={() => closeDrawerRight()}>
        <button className="flex justify-between items-center w-full py-3 text-lg font-semibold">
          {isRTL ? "اتصل بنا" : "Contact"}
        </button>
      </Link>
    </div>
  );
};

export default ContactDrawer;
