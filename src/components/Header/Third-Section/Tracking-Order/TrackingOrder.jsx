import React from "react";
import { FaBox } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TrackingOrder = () => {
  const { isLogged } = useSelector((state) => state.authState);

  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center">
      <Link
        to={isLogged ? `/my-account/orders` : `/register`}
        className="flex flex-col items-center"
      >
        <span className="text-white font-semibold hover:text-[#f8c530] duration-300 cursor-pointer flex items-center">
          {t("tracking_order")}
        </span>
      </Link>
    </div>
  );
};

export default TrackingOrder;
