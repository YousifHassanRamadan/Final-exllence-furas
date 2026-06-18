import React from "react";
import { Typography, Button, ButtonGroup } from "@material-tailwind/react";
import { Clock } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";

const ProductActions = ({
  product,
  quantity,
  handleQuantityChange,
  handleAddToCart,
  handleFavoriteClick,
  variantStock,
  isLoading,
  isRTL,
}) => {
  const { t } = useTranslation();

  const isOutOfStock = variantStock <= 0;

  return (
    <div>
      {/* Quantity selector — hidden if coming soon or out of stock */}
      {isLoading ? (
        <Skeleton width={120} height={40} />
      ) : !product?.comingSoon ? (
        <div className="mt-4 flex items-center">
          <Typography className={`${isRTL ? "ml-4" : "mr-4"}`}>
            {t("quantity")}
          </Typography>
          <ButtonGroup variant="outlined">
            <Button
              onClick={() => handleQuantityChange("increase")}
              disabled={isOutOfStock}
            >
              +
            </Button>
            <Button disabled>{quantity}</Button>
            <Button
              onClick={() => handleQuantityChange("decrease")}
              disabled={quantity <= 1}
            >
              -
            </Button>
          </ButtonGroup>
        </div>
      ) : null}

      {/* Add to cart / favourite buttons */}
      {isLoading ? (
        <Skeleton width={120} height={40} />
      ) : (
        <div className="mt-6 flex flex-wrap gap-4">
          {!product?.comingSoon && (
            <Button
              onClick={() => handleAddToCart(product)}
              disabled={isOutOfStock}
              className={`text-white px-6 py-2 rounded-md ${
                isOutOfStock ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
              }`}
            >
              {isOutOfStock
                ? t("out_of_stock") || "Out of Stock"
                : t("add_to_cart")}
            </Button>
          )}
          <Button
            onClick={handleFavoriteClick}
            className="bg-green-600 text-white px-6 py-2 rounded-md"
          >
            {t("add_to_favourite")}
          </Button>
        </div>
      )}

      {/* Coming Soon info box */}
      {product?.comingSoon && (
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 text-blue-700">
            <Clock size={20} />
            <Typography className="font-semibold">
              {t("product_launch_info")}
            </Typography>
          </div>
          <Typography className="text-gray-700 mt-2 text-sm">
            {t("not_available_yet_info")}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default ProductActions;
