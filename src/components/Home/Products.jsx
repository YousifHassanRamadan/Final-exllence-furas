import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../Ui-Card/ProductCard";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";

const Products = () => {
  const { t } = useTranslation();

  const { isRTL } = useSelector((state) => state.RTLState);

  const { Allproducts, loading } = useSelector(
    (state) => state.allProductsState
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  // console.log("all products:", Allproducts);

  return (
    <div className="w-full mt-20">
      {/**Featured-New-Products */}
      <div className="Featured-New-Products flex justify-center items-center mb-16">
        <div className="text">
          <h2 className="flex justify-center text-center sm:text-4xl text-2xl font-bold text-[#424a63]">
            {t("featuredNewProducts")}
          </h2>
          <p className="text-[#aeb1bb] sm:text-xl text-md text-center">
            {t("exploreOurNewAndHotProducts")}
          </p>
        </div>
      </div>

      {/**ourProducts */}
      <div className="ourProducts flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-9">
        {Allproducts?.map((prod) => (
          <ProductCard product={prod} key={prod._id} />
        ))}
      </div>

      {/**See Our Products */}
      <div className="SeeOurProducts w-full flex justify-center my-16">
        <Link
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-[#284980] text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:bg-blue-800 transition cursor-pointer flex items-center"
          to={`/product-category/allproducts`}
        >
          {t("seeOurProducts")}
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

export default Products;
