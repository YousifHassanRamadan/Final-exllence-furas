import React from "react";
import { Helmet } from "react-helmet";
import HomeContent from "../components/Home/HomeContent";
import { menSlide, womenSlide, kidSlide } from "../../assets/images";
import { useTranslation } from "react-i18next"; // إضافة

const HomePage = () => {
  const { t } = useTranslation();

  const productsData = [
    {
      image: womenSlide,
      name: t("women_name"),
      description: t("women_description"),
      price: "89.00",
      startPrice: t("women_startPrice"),
      direction: "right",
      path: "/product-category/women",
    },
    {
      image: menSlide,
      name: t("men_name"),
      description: t("men_description"),
      price: "120.00",
      startPrice: t("men_startPrice"),
      direction: "left",
      path: "/product-category/men",
    },
    {
      image: kidSlide,
      name: t("kids_name"),
      description: t("kids_description"),
      price: "49.00",
      startPrice: t("kids_startPrice"),
      direction: "center",
      path: "/product-category/kids",
    },
  ];

  return (
    <div className="min-h-screen">
      <HomeContent products={productsData} />
    </div>
  );
};

export default HomePage;
