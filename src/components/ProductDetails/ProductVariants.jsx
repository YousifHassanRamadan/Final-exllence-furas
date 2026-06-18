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
                onClick={() => {
                  setSelectedColor(color);
                  setSelectedSize(null);
                }}
                disabled={product?.comingSoon}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-sm font-medium transition-all ${
                  selectedColor === color
                    ? "border-[#284980] bg-[#284980]/5 text-[#284980]"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                {/* Color swatch dot */}
                <span
                  className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
                {/* Color name */}
                <span>{color}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* الأحجام */}
      {selectedColor && !product?.comingSoon && (
        <div className="mt-4">
          {Boolean(
            product?.variants?.find(
              (variant) => variant.color === selectedColor && variant.size,
            ),
          ) && (
            <Typography className="font-semibold">
              {t("select_size")}
            </Typography>
          )}
          <div className="flex gap-2 mt-2 flex-wrap">
            {product?.variants
              ?.filter(
                (variant) => variant.color === selectedColor && variant.size,
              )
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
