import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NewProduct = () => {
  const { t } = useTranslation();

  return (
    <div className="mb-1.5 editGaps">
      <Link to={"/product-category/new-product"}>
        <span className="text-white font-semibold hover:text-[#f8c530] duration-300 cursor-pointer">
          {t("new_product")}
        </span>
      </Link>
    </div>
  );
};

export default NewProduct;
