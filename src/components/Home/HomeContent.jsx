/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { tshirtCollections } from "../../../assets/images";
import { Link } from "react-router-dom";

import { IoIosArrowRoundForward } from "react-icons/io";
import SwiperComp from "./SwiperComp";
import HomeCategories from "./HomeCategories";
import FashionCollections from "./FashionCollections";
import { Container } from "@mui/material";
import Products from "./Products";
import SpecialOffer from "./SpecialOffer";
import FamousBrands from "./FamousBrands";
import OnSaleProd from "./OnSaleProd";
import ShopMagazine from "./ShopMagazine";
import "./HomeContent.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import i18n from "../../i18n";
import { IoIosArrowRoundBack } from "react-icons/io";
import { handelRTL } from "../../reduxSystem/slices/handleRTLSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../reduxSystem/slices/authSlice";
import { getAllProducts } from "../../reduxSystem/slices/getAllProductsSlice";
import { fetchCart } from "../../reduxSystem/slices/getUserCartSlice";
import { fetchUserAddress } from "../../reduxSystem/slices/getUserAddressSlice";
import { getAllCategory } from "../../reduxSystem/slices/getAllCategorySlice";
import ProductSwiper from "../Swiper/ProductSwiper";

const HomeContent = ({ products }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserAddress());
    dispatch(getAllCategory());
    dispatch(fetchCart());
  }, []);

  const { Allcategories } = useSelector((state) => state.getCategoryState);

  // console.log("Allcategories", Allcategories);

  const { isRTL } = useSelector((state) => state.RTLState);

  const { userData, token } = useSelector((state) => state.authState);
  // console.log("User Data:", userData);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "en_US" ? "ltr" : "rtl";
    if (i18n.language === "ar_AE") {
      dispatch(handelRTL(true));
    } else {
      dispatch(handelRTL(false));
    }
  }, [i18n.language, isRTL]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token));
    }
  }, [token]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <Container maxWidth="xl" className="mt-10">
      {Allcategories.map((catName, i) => (
        <div className="flex flex-col my-5 " key={i}>
          {catName.productCount >= 4 && (
            <ProductSwiper
              arabicName={catName.arabicName}
              englishName={catName.name}
            />
          )}
        </div>
      ))}

      {/** Home Appliance And Swiper */}
      <div className="flex flex-wrap items-center justify-between">
        {/** Home Appliance */}
        <div className="editWidth bg-white w-full sm:w-[80%] md:w-[60%] lg:w-[45%] h-auto md:h-[55vh] rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center transition-transform duration-300 hover:scale-[105%] p-5">
          {/** Text Section */}
          <div className="text flex flex-col w-full md:w-[50%] justify-evenly p-5">
            {/* Header */}
            <div className="header text-[#424a63]">
              <p className="text-xl font-bold">{t("men_fashion_header")}</p>
            </div>

            {/* Body */}
            <div className="body text-[#858a99] mt-3 mb-6">
              <p>{t("men_fashion_body")}</p>

              {/* Button */}
              <div className="btn mt-4">
                <Link
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  to={`/product-category/men`}
                  className={
                    isRTL
                      ? "bg-transparent font-thin text-[#345286] py-2 rounded transition duration-300 flex items-center"
                      : "bg-transparent font-thin text-[#345286] py-2 pr-4 rounded transition duration-300 flex items-center"
                  }
                >
                  {t("view_men_collection")}
                  {isRTL ? (
                    <IoIosArrowRoundBack className="mr-2" />
                  ) : (
                    <IoIosArrowRoundForward />
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="img flex flex-col w-full md:w-[50%] justify-end items-center overflow-hidden">
            <img
              src={tshirtCollections}
              className="w-[80%] object-contain h-auto max-h-[400px] md:max-h-[300px] mt-4 md:mt-0"
              alt={t("men_fashion_header")}
            />
          </div>
        </div>

        {/** Swiper */}
        <div className="w-1/2 h-auto editWidthSwiper">
          <SwiperComp products={products} />
        </div>
      </div>

      <div className="py-9 mb-16">
        <FashionCollections />
      </div>

      {/** Featured New Products */}
      <Products />

      {/** Famous Brands */}
      <FamousBrands />

      {/** Carousel */}
    </Container>
  );
};

export default HomeContent;
