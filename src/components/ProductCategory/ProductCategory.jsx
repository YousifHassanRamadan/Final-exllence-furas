import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../reduxSystem/slices/getAllCategorySlice";
import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductCategory = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { Allcategories, categoryLoading, error } = useSelector(
    (state) => state.getCategoryState
  );

  const { isRTL } = useSelector((state) => state.RTLState);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <div className="bg-gray-100 rounded-lg shadow-md">
      <div className="header bg-[#eeefef] px-4 py-3 text-lg font-semibold text-gray-700">
        <p className="text-[#50576e] text-xl font-semibold">
          {t("productCategories")}
        </p>
      </div>
      <div className="body p-4">
        {/* Show loading state */}
        {categoryLoading && <p className="text-gray-500">{t("loading")}</p>}

        {/* Show error if fetching fails */}
        {error && (
          <p className="text-red-500">{t("errorFetchingCategories")}</p>
        )}

        {/* Show categories if available */}
        <ul className="space-y-2">
          {Allcategories.length > 0
            ? Allcategories.map((category, index) => (
                <li
                  key={index}
                  className="text-sm flex  items-center cursor-pointer hover:text-[#2b7fff] text-[#5E77A0] transition-all duration-300 hover:ml-2 whitespace-nowrap"
                >
                  <div
                    className="flex items-center"
                    onClick={() => {
                      navigate(
                        `/product-category/${category.name.toLowerCase()}`,
                        { replace: true }
                      ),
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {isRTL ? <ChevronLeft /> : <ChevronRight />}
                    {isRTL ? category.arabicName : category.name}
                  </div>
                </li>
              ))
            : !categoryLoading && (
                <p className="text-gray-500">{t("noCategories")}</p>
              )}
        </ul>
      </div>
    </div>
  );
};

export default ProductCategory;
