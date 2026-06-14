import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "../reduxSystem/slices/getFavouriteSlice";
import WishCard from "../components/Ui-Card/WishCard";

const MyWishListPage = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.favouriteState);

  const { favourites, loading } = useSelector(
    (state) => state.getFavouritestate
  );

  // console.log("favourites from wishlist page", favourites);

  const [, forceRender] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    dispatch(fetchFavorites());
    forceRender(); // يجبر الصفحة على إعادة التصيير
  }, []);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [isLoading]);

  return (
    <div className="bg-[#f2f2f2] w-full p-8 sm:p-16">
      <header className="mb-5">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#284980]">
          {t("favouriteProducts")}
        </h2>
      </header>

      <hr className="w-full opacity-20 h-[2px] rounded bg-gray-500 my-5" />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="h-48 bg-gray-300 animate-pulse rounded"
            ></div>
          ))}
        </div>
      ) : favourites.length > 0 ? (
        <div className=" flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-9">
          {favourites.map((product) => (
            <WishCard
              key={product._id}
              product={product}
              forceRender={forceRender}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center pt-9">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#284980]">
            {t("yourWishlistIsEmpty")}
          </h3>
          <Link
            to="/product-category/allproducts"
            className="mt-6 bg-yellow-500 text-[#284980] py-2 px-4 rounded shadow-md transition duration-200 hover:bg-[#284980] hover:text-white"
          >
            {t("backToShop")}
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyWishListPage;
