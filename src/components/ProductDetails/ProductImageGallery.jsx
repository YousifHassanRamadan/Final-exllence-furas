import React from "react";
import { CardHeader } from "@material-tailwind/react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";

const ProductImageGallery = ({
  mainImage,
  setMainImage,
  product,
  variantImg,
  isLoading,
}) => {
  const { t } = useTranslation();

  console.log("product in ProductImageGallery:", product);

  return (
    <CardHeader className="w-full lg:w-[50%] md:w-[100%] h-auto sm:mx-0 mx-auto relative">
      {isLoading ? (
        <Skeleton height={400} />
      ) : (
        <>
          <img
            src={mainImage}
            alt={product?.title || "Product Image"}
            className={`w-full h-full object-cover`}
          />
          {product?.comingSoon && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black opacity-80">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl font-bold py-3 px-6 rounded-lg shadow-lg transform rotate-12 mb-4">
                {t("coming_soon")}
              </div>
              <p className="text-white bg-black bg-opacity-50 p-2 rounded">
                {t("be_first_to_know")}
              </p>
            </div>
          )}
        </>
      )}
    </CardHeader>
  );
};

export default ProductImageGallery;
