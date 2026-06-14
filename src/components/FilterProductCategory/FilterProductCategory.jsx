import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPriceFilter,
  setMaxPrice,
  setMinPrice,
} from "../../reduxSystem/slices/priceFilter";
import "./FilterProductCategory.css";

const FilterProductCategory = () => {
  const dispatch = useDispatch();
  const { minPrice, maxPrice } = useSelector((state) => state.priceFilterState);

  const { t } = useTranslation();
  const [inputMinPrice, setInputMinPrice] = useState(minPrice);
  const [inputMaxPrice, setInputMaxPrice] = useState(maxPrice);

  const handleMinPriceChange = (event) => {
    setInputMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setInputMaxPrice(event.target.value);
  };

  const filter = () => {
    // إضافة تحقق من القيم المدخلة
    const min = parseInt(inputMinPrice);
    const max = parseInt(inputMaxPrice);

    if (min <= max) {
      dispatch(setMinPrice(min));
      dispatch(setMaxPrice(max));
    } else {
      // يمكن إضافة إشعار خطأ هنا
      console.error("Min price cannot be greater than max price");
    }
  };

  const resetHandler = () => {
    console.log("reset price filter");

    dispatch(resetPriceFilter());
  };

  useEffect(() => {
    setInputMinPrice(minPrice);
    setInputMaxPrice(maxPrice);
  }, [minPrice, maxPrice, dispatch]);

  return (
    <div className="bg-gray-100 rounded-lg shadow-md">
      <div className="header bg-[#eeefef] px-4 py-3 text-lg font-semibold text-gray-700">
        <p className="text-[#50576e] text-xl font-semibold">
          {t("filterByPrice")}
        </p>
      </div>
      <div className="body mx-auto p-5">
        <div className="price-inputs flex justify-center mt-4 space-x-4 flex-wrap">
          <div className="flex flex-col w-full sm:w-1/3">
            <label className="block text-sm font-semibold text-gray-700">
              {t("min")}
            </label>
            <input
              type="number"
              value={inputMinPrice}
              onChange={handleMinPriceChange}
              className="p-2 border border-gray-300 rounded-md text-sm"
              placeholder={t("enter_min_price")}
              min={0}
            />
          </div>
          <div className="flex flex-col w-full sm:w-1/3 mt-4 sm:mt-0">
            <label className="block text-sm font-semibold text-gray-700">
              {t("max")}
            </label>
            <input
              type="number"
              value={inputMaxPrice}
              onChange={handleMaxPriceChange}
              className="p-2 border border-gray-300 rounded-md text-sm"
              placeholder={t("enter_max_price")}
              min={0}
            />
          </div>
        </div>
        <div className="btnFilter flex flex-col justify-center mt-5">
          <Button
            className="bg-[#f8c530] text-[#2b4a7e] w-full sm:w-auto my-[5%]"
            onClick={filter}
          >
            {t("filter")}
          </Button>
          <Button
            variant="outlined"
            className="text-[#2b4a7e] border-[#f8c530] w-full sm:w-auto"
            onClick={resetHandler}
          >
            {t("reset")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterProductCategory;
