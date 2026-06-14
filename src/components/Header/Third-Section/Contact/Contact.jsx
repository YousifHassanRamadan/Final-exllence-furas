import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Text */}
      <Link to={"/contact"}>
        <span className="text-white font-semibold hover:text-[#f8c530] duration-300 cursor-pointer ">
          {t("contact")}
        </span>
      </Link>
    </div>
  );
};

export default Contact;
