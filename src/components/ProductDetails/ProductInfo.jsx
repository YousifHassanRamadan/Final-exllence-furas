import React from "react";
import { Typography, Chip } from "@material-tailwind/react";
import { Clock } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";

const ProductInfo = ({ product, isLoading, isRTL }) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex justify-between items-center">
        {isLoading ? (
          <Skeleton width={200} />
        ) : (
          <Typography
            variant="h5"
            className="font-bold text-[#284980] text-2xl md:text-3xl"
          >
            {isRTL ? product?.arabicTitle : product?.title}
          </Typography>
        )}

        {/* Coming Soon Badge */}
        {product?.comingSoon && (
          <Chip
            value="Coming Soon"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-2 "
            icon={<Clock className="h-4 w-4 mx-2" />}
          />
        )}
      </div>

      {isLoading ? (
        <Skeleton width={200} count={3} />
      ) : (
        <Typography
          variant="h5"
          className="text-gray-600 mt-2 text-sm md:text-base"
        >
          {isRTL ? product?.arabicDescription : product?.description}
        </Typography>
      )}

      <div className="border-t border-gray-300 my-4"></div>

      {isLoading ? (
        <Skeleton width={100} />
      ) : (
        <Typography className="text-gray-700 font-semibold">
          {t("category")}:{" "}
          {isRTL ? product?.category?.arabicName : product?.category?.name}
        </Typography>
      )}
    </div>
  );
};

export default ProductInfo;
