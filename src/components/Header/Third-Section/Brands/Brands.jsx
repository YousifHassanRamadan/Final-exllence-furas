import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Brands = () => {
  const { t } = useTranslation();

  const { lang } = useParams();

  return (
    <div className="mb-1.5 editGaps">
      <div className="relative inline-block">
        {/* HOT Badge */}
        <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#a0f709] text-black text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
          {t("new")}
        </span>

        {/* Text */}
        <Link to={`/brands`}>
          <span className="text-white font-semibold hover:text-[#f8c530] duration-300 cursor-pointer">
            {t("brands")}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Brands;
