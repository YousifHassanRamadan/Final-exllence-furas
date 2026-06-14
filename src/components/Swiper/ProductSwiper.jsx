import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { getAllSwiperProducts } from "../../reduxSystem/slices/getSwiperProductSlice";
import { useTranslation } from "react-i18next";

const ProductSwiper = ({ arabicName, englishName }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categoryName, setCategoryName] = useState("");

  const { isRTL } = useSelector((state) => state.RTLState);

  const swiperRef = useRef(null);

  const { i18n, t } = useTranslation();

  const language = searchParams?.get("language") || i18n?.language || "en_US";

  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(0);

  const swiperProductsState = useSelector(
    (state) => state.allSwiperProductsState
  );
  const { products = [], loading = true } =
    swiperProductsState[englishName] || {};

  // console.log("products", products);

  useEffect(() => {
    dispatch(getAllSwiperProducts({ category: englishName }));
  }, [englishName, dispatch]);

  useEffect(() => {
    if (language === "en_US") {
      setCategoryName(englishName);
    } else {
      setCategoryName(arabicName);
    }
  }, [language, englishName, document.dir]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-300 h-40 w-full rounded"
          ></div>
        ))}
      </div>
    );
  }

  // console.log("products", products);

  return (
    <div className="relative bg-[#f9fafb] py-8 rounded-lg">
      <div className="text flex items-center justify-between mb-6  ">
        <p className="text-[#284980] text-2xl mr-2 font-semibold">
          {categoryName}
        </p>
        <Link
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          to={`/product-category/${englishName}`}
          className="text-md text-[#487dab] flex items-center hover:underline transition-all duration-300"
        >
          {language === "en_US" ? "See More" : "عرض المزيد"}{" "}
          {isRTL ? (
            <FaArrowLeft className="m-1 text-[10px]" />
          ) : (
            <FaArrowRight className="ml-1 text-[10px]" />
          )}
        </Link>
      </div>
      <Swiper
        style={{ cursor: "grab" }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        spaceBetween={10}
        speed={500}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        loop={true}
      >
        {products.map((product, index) => (
          <SwiperSlide key={product._id}>
            <Link
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              to={`/productdetails/${product._id}`}
              className={`flex flex-col items-center my-5 hover:shadow-lg transition-shadow duration-300 rounded-lg relative `}
            >
              <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 overflow-hidden relative">
                <img
                  src={product.thumbnail}
                  alt={isRTL ? product.arabicTitle : product.title}
                  className={`w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105 rounded-md ${
                    product.comingSoon ? "filter blur-xs" : ""
                  }`}
                />
                {product.comingSoon && (
                  <div className="absolute inset-0 flex items-center justify-center flex-cols">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-2 rounded rotate-12">
                      {language === "en_US" ? "Coming Soon" : "قريبًا"}
                    </div>
                  </div>
                )}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center mt-2"
              >
                <p className="text-sm font-semibold text-gray-700 line-clamp-1">
                  {isRTL ? product.arabicTitle : product.title}
                </p>
                {product.comingSoon ? (
                  <p className="text-xs text-yellow-600 font-bold mt-1">
                    {language === "en_US"
                      ? "Not Available Yet"
                      : "غير متوفر بعد"}
                  </p>
                ) : (
                  <p className="text-xs text-green-600 font-bold mt-1">
                    {product.price} SAR
                  </p>
                )}
              </motion.div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {products.length > 4 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => swiperRef.current.slidePrev()}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-[#284980] p-2 rounded-full shadow-lg text-white z-[1] text-[8px] md:text-lg hover:bg-[#1f365d] transition-colors duration-300"
          >
            <MdArrowBackIos size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => swiperRef.current.slideNext()}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-[#284980] p-2 rounded-full shadow-lg text-white z-[1] text-[8px] md:text-lg hover:bg-[#1f365d] transition-colors duration-300"
          >
            <MdArrowForwardIos size={20} />
          </motion.button>
        </>
      )}
    </div>
  );
};

export default ProductSwiper;
