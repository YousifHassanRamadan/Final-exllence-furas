import React from "react";
import { Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

const ProductVariants = ({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
}) => {
  const { t } = useTranslation();

  return (
    <div>
      {/* الألوان المتاحة */}
      {selectedColor && !product?.comingSoon && (
        <div className="mt-4">
          <Typography className="font-semibold">
            {t("available_colors")}
          </Typography>
          <div className="flex gap-2 mt-2 flex-wrap">
            {[
              ...new Set(product?.variants?.map((variant) => variant.color)),
            ].map((color, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color ? "border-black" : "border-gray-300"
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => {
                  setSelectedColor(color);
                  setSelectedSize(null);
                }}
                disabled={product?.comingSoon}
              />
            ))}
          </div>
        </div>
      )}

      {/* الأحجام */}
      {selectedColor && !product?.comingSoon && (
        <div className="mt-4">
          <Typography className="font-semibold">{t("select_size")}</Typography>
          <div className="flex gap-2 mt-2 flex-wrap">
            {product?.variants
              ?.filter((variant) => variant.color === selectedColor)
              .map((variant, index) => (
                <button
                  key={index}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold ${
                    selectedSize === variant.size
                      ? "bg-[#284980] text-white"
                      : "bg-gray-100"
                  }`}
                  onClick={() => setSelectedSize(variant.size)}
                  disabled={product?.comingSoon}
                >
                  {variant.size}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductVariants;
