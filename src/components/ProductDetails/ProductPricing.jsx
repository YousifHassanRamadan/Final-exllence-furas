import React from "react";
import { Typography } from "@material-tailwind/react";
import { ShoppingCartIcon } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";

const ProductPricing = ({
  product,
  variantPrice,
  offerPercentage,
  selectedColor,
  selectedSize,
  isLoading,
  isRTL,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      {/* السعر والخصم */}
      {isLoading ? (
        <Skeleton width={200} height={50} />
      ) : (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          {product?.comingSoon ? (
            <div className="flex flex-col">
              <Typography className="text-xl font-bold text-purple-600">
                {t("price_announce")}
              </Typography>
              <Typography className="text-sm text-gray-600 mt-1">
                {t("be_first_to_know_price")}
              </Typography>
            </div>
          ) : (
            <div>
              {product?.offer?.isActive && (
                <div className="flex justify-start items-center">
                  <Typography className="text-lg text-gray-500 line-through">
                    <span className="ml-2">SAR</span>
                    {product?.variants?.length > 0
                      ? variantPrice.toFixed(2)
                      : product?.price.toFixed(2)}
                  </Typography>
                  <div className="ml-2 text-sm font-semibold text-red-500 bg-red-100 px-2 py-1 rounded-md w-fit">
                    🔥 {t("save_percent", { percent: offerPercentage })}
                  </div>
                </div>
              )}
              <Typography className="text-xl font-bold text-green-600">
                {(
                  variantPrice - (variantPrice * offerPercentage) / 100 ||
                  product?.price - (product?.price * offerPercentage) / 100
                ).toFixed(2)}
                <span className="ml-2">SAR</span>
              </Typography>
              {selectedSize ? (
                <Typography
                  className={`mt-2 ${
                    product?.variants?.find(
                      (variant) =>
                        variant.color === selectedColor &&
                        variant.size === selectedSize &&
                        variant.stock >= 1
                    )
                      ? ""
                      : "text-red-500"
                  } flex `}
                >
                  <div className="flex items-center mr-1">
                    <ShoppingCartIcon className="w-4 h-4 text-green-500 mr-1" />
                    <span>{t("in_stock")}: </span>
                  </div>

                  <span
                    className={`font-semibold text-green-500 ${
                      isRTL ? "mr-1" : ""
                    }`}
                  >
                    {product?.variants?.find(
                      (variant) =>
                        variant.color === selectedColor &&
                        variant.size === selectedSize
                    )?.stock || 0}
                  </span>
                </Typography>
              ) : (
                product?.variants.length >= 0 && (
                  <div className="flex items-center gap-2 text-gray-600 mt-2">
                    <div className={`flex items-center `}>
                      <ShoppingCartIcon className="w-4 h-4 text-green-500 mr-1" />
                      <span>{t("in_stock")}:</span>
                    </div>
                    <span className={`font-semibold text-green-500 `}>
                      {product.stock}
                    </span>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPricing;
