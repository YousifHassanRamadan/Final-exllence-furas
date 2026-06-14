import React from "react";
import { bgOnsale, crouch } from "../../../assets/images";
import ProductCard from "../Ui-Card/ProductCard";
import SubscribeForm from "./SubscribeForm ";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const OnSaleProd = () => {
  const { t } = useTranslation();

  const { isRTL } = useSelector((state) => state.RTLState);

  const { Allproducts, loading } = useSelector(
    (state) => state.allProductsState
  );

  const slicedProducts = Allproducts?.slice(0, 3);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className="my-[10%] w-full h-auto bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: `url('${bgOnsale}')` }}
    >
      <div className="onsale flex flex-col lg:flex-row justify-center lg:justify-around items-center p-5 lg:p-10">
        {/* Sale Text Section */}
        <div
          className={`text-center ${
            isRTL ? "lg:text-right " : " lg:text-left"
          }  flex flex-col w-full sm:w-[60%] lg:w-[20%] mb-10 lg:mb-0`}
        >
          <div className="text ">
            {" "}
            <p className="text-white text-2xl sm:text-3xl font-semibold">
              {t("onSale")}
            </p>
            <p className="text-white text-2xl sm:text-3xl font-semibold">
              {t("products")}
            </p>
            <p className="text-[#a4abb4] text-sm sm:text-base mt-2">
              {t("over30PercentOff")}
            </p>
          </div>

          <div className="flex justify-center lg:justify-start w-full">
            <button className="mt-6 bg-yellow-500 text-[#284980] font-semibold py-2 px-4 rounded shadow cursor-pointer hover:text-white hover:bg-[#284980] transition duration-200">
              {t("viewAllBrands")}
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="ourProducts grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full sm:w-[80%] lg:w-[80%]">
          {slicedProducts?.map((prod) => (
            <ProductCard product={prod} key={prod.title} />
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="flex justify-center items-center px-4">
        <div
          className={`crouch flex flex-col ${
            isRTL ? "lg:flex-row-reverse" : "lg:flex-row"
          } justify-between items-center border-[#3d4762] border-[10px] bg-white w-full sm:w-[80%] lg:w-[60%] mt-6 sm:mt-10 lg:mt-[4%]`}
        >
          {/* Newsletter Text */}
          <div
            className={`text p-5 text-center ${
              isRTL ? "lg:text-rigth" : "lg:text-left"
            } `}
          >
            <div className="join">
              <p className="text-[#4d556c] text-xl sm:text-2xl lg:text-3xl font-semibold">
                {t("joinOurNewsletter")}
              </p>
              <p className="text-[#4d556c] text-xl sm:text-2xl lg:text-3xl font-semibold mt-2 mb-5">
                {t("missAGreatOffer")}
              </p>
            </div>
            <div className="subscribeNow">
              <SubscribeForm />
            </div>
          </div>

          {/* Newsletter Image */}
          <div className="img w-full lg:w-auto flex justify-center">
            <img
              src={crouch}
              alt="Newsletter"
              className="w-[80%] sm:w-full object-cover h-auto sm:h-[30vh] lg:h-[35vh]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnSaleProd;
