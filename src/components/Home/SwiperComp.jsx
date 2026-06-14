import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "./SwiperComp.css";
import { Link } from "react-router-dom";

const SwiperComp = ({ products }) => {
  const { t } = useTranslation();
  const isRTL = t.language === "ar";

  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [t.language]);

  return (
    <Swiper
      key={key}
      dir={isRTL ? "rtl" : "ltr"} /**out direction */
      rtl={isRTL} /**inner comp direction */
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {products.map((prod, index) => (
        <SwiperSlide key={index}>
          <div
            className={`w-full flex flex-col sm:flex-row items-center justify-center p-4 min-h-[400px] ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {/* صورة المنتج */}
            <div className="w-full sm:w-1/2 h-[400px] flex justify-center items-center bg-blue-900">
              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* معلومات المنتج */}
            <div className="w-full sm:w-1/2 bg-white p-6 flex flex-col justify-between">
              <h3 className="text-xl sm:text-2xl font-bold text-[#424a63]">
                {prod.name}
              </h3>
              <p className="text-gray-600 my-4">{prod.description}</p>

              {/* زر الطلب */}
              <Link
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                to={`${prod.path}`}
                className="bg-[#284980] text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition"
              >
                {t("check_collection", { name: prod.name })}
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComp;
