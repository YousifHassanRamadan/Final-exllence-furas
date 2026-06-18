import React from "react";
import { Typography } from "@material-tailwind/react";
import { ShoppingCartIcon } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";

const ProductPricing = ({
  product,
  variantPrice,
  variantStock,
  offerPercentage,
  selectedColor,
  selectedSize,
  isLoading,
  isRTL,
}) => {
  const { t } = useTranslation();

  // Final price after discount
  const finalPrice = variantPrice - (variantPrice * offerPercentage) / 100;

  // Stock is out if 0 or less
  const isOutOfStock = variantStock <= 0;

  return (
    <div>
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
              {/* Original price with strikethrough (only when offer is active) */}
              {product?.offer?.isActive && (
                <div className="flex justify-start items-center">
                  <Typography className="text-lg text-gray-500 line-through">
                    <span className="ml-2">SAR</span>
                    {variantPrice.toFixed(2)}
                  </Typography>
                  <div className="ml-2 text-sm font-semibold text-red-500 bg-red-100 px-2 py-1 rounded-md w-fit">
                    🔥 {t("save_percent", { percent: offerPercentage })}
                  </div>
                </div>
              )}

              {/* Final price after discount */}
              <Typography className="text-xl font-bold text-green-600">
                {finalPrice.toFixed(2)}
                <span className="ml-2">SAR</span>
              </Typography>

              {/* Stock display — uses variantStock prop for ALL cases */}
              <div className="flex items-center gap-2 mt-2">
                <ShoppingCartIcon className="w-4 h-4 text-green-500" />
                <span className="text-gray-600">{t("in_stock")}:</span>
                <span
                  className={`font-semibold ${
                    isOutOfStock ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {variantStock}
                </span>
                {isOutOfStock && (
                  <span className="text-red-500 text-sm font-medium">
                    ({t("out_of_stock") || "Out of stock"})
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPricing;
