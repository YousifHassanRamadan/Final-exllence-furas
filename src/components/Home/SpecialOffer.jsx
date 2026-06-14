import React from "react";
import { bgheater, heater } from "../../../assets/images";
import { FaOpencart } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SpecialOffer = () => {
  const { t } = useTranslation();

  const { isRTL } = useSelector((state) => state.RTLState);

  return (
    <div
      className={`my-[10%] w-full flex lg:flex-row sm:flex-col flex-col justify-around items-center lg:h-[70vh] h-auto bg-cover bg-center px-4`}
      style={{ backgroundImage: `url('${bgheater}')` }}
    >
      <div className="img w-full lg:w-1/2 flex justify-center">
        <img
          src={heater}
          alt={t("robotVacuumCleaner")}
          className="w-[90%] sm:w-[80%] transition-all hover:ml-5 hover:mb-5 cursor-pointer mb-[4rem] lg:mb-[7rem]"
        />
      </div>

      <div className="text flex flex-col justify-between lg:text-left w-full lg:w-1/2 pb-6">
        <div className="relative max-w-sm mx-auto lg:max-w-none w-full">
          <div className="bg-[#284980] text-white text-lg font-bold py-2 px-4 rounded cursor-pointer text-center">
            {t("specialOfferOnlyThisWeek")}
          </div>
          <div className="absolute -top-5 sm:-right-9 -right-5 bg-yellow-400 text-[#284980] font-bold px-4 py-2 rounded-lg transform rotate-3 cursor-pointer">
            {t("price")}
          </div>
        </div>

        <div
          className={`text-center lg:text-left pt-5 flex ${
            isRTL ? "justify-center" : "justify-start"
          } `}
        >
          <div className="header">
            {" "}
            <p className="text-[#424a63] text-3xl lg:text-4xl font-semibold my-4 cursor-pointer">
              {t("xtraAutomatic")}
            </p>
            <p className="text-[#424a63] text-3xl lg:text-4xl font-semibold my-2 cursor-pointer">
              {t("robotVacuumCleaner")}
            </p>
          </div>
        </div>

        <div className=" flex justify-start">
          <div className="body text-center lg:text-left">
            <p className="text-[#a0a3ae] px-4  my-6 cursor-pointer">
              {t("robotVacuumDescription")}
            </p>
          </div>
        </div>

        <div
          className={`btn flex justify-center ${
            isRTL ? "justify-center" : "lg:justify-start"
          }  `}
        >
          <Link className="flex items-center justify-center bg-yellow-500 text-[#284980] font-semibold py-2 px-4 rounded shadow cursor-pointer hover:text-white hover:bg-[#284980] transition duration-200">
            <FaOpencart className="mr-2" /> {t("readMoreAndBuyNow")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
