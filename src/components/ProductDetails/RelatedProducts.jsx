import React from "react";
import { Typography } from "@material-tailwind/react";
import ProductCard from "../Ui-Card/ProductCard";
import { useTranslation } from "react-i18next";

const RelatedProducts = ({ relatedProducts }) => {
  const { t } = useTranslation();

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <Typography variant="h4" className="font-bold text-[#284980] mb-4">
        {t("related_products")}
      </Typography>
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-9">
        {relatedProducts.map((relatedProduct) => (
          <ProductCard key={relatedProduct._id} product={relatedProduct} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
