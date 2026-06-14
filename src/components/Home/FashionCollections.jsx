import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  mentCollections,
  womentCollections,
  kidtCollections,
  summerCollections,
} from "../../../assets/images";

const FashionCollections = () => {
  const { t } = useTranslation();
  const { isRTL } = useSelector((state) => state.RTLState);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#424c6a]">
        {t("our_collections")}
      </h2>

      <div className="w-full flex flex-col lg:flex-row gap-6 mb-12">
        {/* Featured Collection - Women's */}
        <div
          className={`group relative w-full lg:w-1/2 h-[500px] overflow-hidden rounded-2xl bg-neutral-100 shadow-lg transition-all duration-500 hover:shadow-xl`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={womentCollections}
              alt={t("womenCollection")}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#284980]/70 to-transparent"></div>
          </div>

          {/* Content */}
          <div
            className={`absolute bottom-0 w-full p-8 text-white ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            <span className="inline-block px-4 py-1 bg-pink-600 text-white text-sm font-medium rounded-full mb-3">
              {t("new_arrival")}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">
              {t("womenCollection")}
            </h3>
            <p className="text-lg text-white/90 mb-4">
              {t("womenCollectionDesc")}
            </p>

            <Link
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              to="/product-category/women"
              className={`inline-flex items-center px-6 py-3 bg-white hover:bg-pink-600 hover:text-white text-[#284980]/80 font-medium rounded-full transition-all duration-300 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {t("explore_collection")}
              {isRTL ? (
                <IoIosArrowRoundBack className="ml-2 text-xl" />
              ) : (
                <IoIosArrowRoundForward className="ml-2 text-xl" />
              )}
            </Link>
          </div>
        </div>

        {/* Men's & Kids' Collections */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          {/* Men's Collection */}
          <div
            className={`group relative w-full h-[240px] overflow-hidden rounded-2xl bg-neutral-100 shadow-lg transition-all duration-500 hover:shadow-xl`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={mentCollections}
                alt={t("menCollection")}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#284980]/70 to-transparent"></div>
            </div>

            {/* Content */}
            <div
              className={`absolute bottom-0 w-full p-6 text-white ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full mb-2">
                {t("trending")}
              </span>
              <h3 className="text-2xl font-bold mb-1">{t("menCollection")}</h3>
              <p className="text-sm text-white/90 mb-3">
                {t("menCollectionDesc")}
              </p>

              <Link
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                to="/product-category/men"
                className={`inline-flex items-center text-white hover:text-blue-600/90 transition-all duration-300 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                {t("shop_now")}
                {isRTL ? (
                  <IoIosArrowRoundBack className="ml-1 text-xl" />
                ) : (
                  <IoIosArrowRoundForward className="ml-1 text-xl" />
                )}
              </Link>
            </div>
          </div>

          {/* Kids' Collection */}
          <div
            className={`group relative w-full h-[240px] overflow-hidden rounded-2xl bg-neutral-100 shadow-lg transition-all duration-500 hover:shadow-xl`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={kidtCollections}
                alt={t("kidsCollection")}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#284980]/70 to-transparent"></div>
            </div>

            {/* Content */}
            <div
              className={`absolute bottom-0 w-full p-6 text-white ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-medium rounded-full mb-2">
                {t("seasonal")}
              </span>
              <h3 className="text-2xl font-bold mb-1">{t("kidsCollection")}</h3>
              <p className="text-sm text-white/90 mb-3">
                {t("kidsCollectionDesc")}
              </p>

              <Link
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                to="/product-category/kids"
                className={`inline-flex items-center text-white hover:text-amber-500/90 transition-all duration-300 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                {t("shop_now")}
                {isRTL ? (
                  <IoIosArrowRoundBack className="ml-1 text-xl" />
                ) : (
                  <IoIosArrowRoundForward className="ml-1 text-xl" />
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Season Highlight Collection */}
      <div className="group relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-2xl bg-neutral-100 shadow-lg transition-all duration-500 hover:shadow-xl">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={summerCollections}
            alt={t("seasonalCollection")}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#284980]/80 via-[#284980]/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div
          className={`absolute inset-0 flex items-center ${
            isRTL ? "justify-end pr-12" : "justify-start pl-12"
          } max-w-xl`}
        >
          <div className="text-white">
            <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-full mb-4">
              {t("limited_time")}
            </span>
            <h3 className="text-3xl md:text-5xl font-bold mb-3">
              {t("summerCollection")}
            </h3>
            <p className="text-lg md:text-xl text-white/90 mb-6">
              {t("summerCollectionDesc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionCollections;
