import React from "react";
import { useTranslation } from "react-i18next";

const ReviewedOrdersPage = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#f2f2f2] w-full p-16">
      <div className="header">
        <p className="text-3xl font-semibold text-[#284980]">
          {t("yourRatingAndReviews")}
        </p>
      </div>
      <div className="w-full opacity-[8%] h-[2px] rounded bg-gray-500 px-9 mt-5 mb-9"></div>
      <div className="body">
        <p className="text-gray-400">{t("noReviewsSubmitted")}</p>
      </div>
    </div>
  );
};

export default ReviewedOrdersPage;
