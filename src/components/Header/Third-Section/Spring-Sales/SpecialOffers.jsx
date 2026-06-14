import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SpecialOffers = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Text */}
      <Link to={"/best-sales"}>
        <span className="text-white font-semibold hover:text-[#f8c530] duration-300 cursor-pointer capitalize ">
          {t("special_offers")}
        </span>
      </Link>
    </div>
  );
};

export default SpecialOffers;
