import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";

const categories = [
  {
    name: "homeAppliance",
    icon: "📺",
    link: "/product-category/home-appliance",
  },
  { name: "appleWatch", icon: "⌚", link: "/product-category/apple-watch" },
  { name: "sports", icon: "👟", link: "/product-category/sports" },
  { name: "furniture", icon: "🛋️", link: "/product-category/furniture" },
  {
    name: "entertainment",
    icon: "🎮",
    link: "/product-category/entertainment",
  },
  { name: "supermarket", icon: "🏪", link: "/product-category/supermarket" },
];

const HomeCategories = () => {
  const { t } = useTranslation();

  const { isRTL } = useSelector((state) => state.RTLState);

  return (
    <div className="rounded-lg border-[#ededed] w-full items-center py-9 ">
      <div className="categories lg:grid lg:grid-cols-6  md:grid md:grid-cols-3 grid grid-cols-2  gap-3 w-full border-4 border-[#ededed] rounded-2xl p-9 flex-wrap ">
        {categories.map((category, index) => (
          <Link
            to={category.link}
            key={index}
            className="flex flex-col items-center transition-transform hover:scale-[120%] cursor-pointer duration-300 my-7"
          >
            <div className="text-6xl" aria-label={t(category.name)}>
              {category.icon}
            </div>
            <p className="text-sm font-medium text-gray-700 mt-3">
              {t(category.name)}
            </p>
          </Link>
        ))}
      </div>
      <div className="fullProdCollection w-full flex justify-center  mt-12">
        <Link
          className="bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:bg-blue-800 transition cursor-pointer flex items-center"
          to={`/product-category/allproducts`}
        >
          {t("fullProductsCollections")}
          {isRTL ? (
            <IoIosArrowRoundBack className="mr-2" />
          ) : (
            <IoIosArrowRoundForward />
          )}
        </Link>
      </div>
    </div>
  );
};

export default HomeCategories;
