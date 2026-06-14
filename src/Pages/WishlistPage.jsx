import { useEffect, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/Ui-Card/ProductCard";
import { Container } from "@mui/material";
import WishCard from "../components/Ui-Card/WishCard";
import { fetchFavorites } from "../reduxSystem/slices/getFavouriteSlice";
import Loader from "../components/loader/Loader";
import { LocalStorageUtils } from "../utils/localStorageUtils";

const WishlistPage = () => {
  const { t } = useTranslation();

  const [, forceRender] = useReducer((x) => x + 1, 0);

  const dispatch = useDispatch();

  const { favourites, loading } = useSelector(
    (state) => state.getFavouritestate
  );

  const { isLoading } = useSelector((state) => state.favouriteState);

  useEffect(() => {
    dispatch(fetchFavorites());
    forceRender(); // يجبر الصفحة على إعادة التصيير
  }, []);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [isLoading]);

  // console.log("favourites", favourites);

  return (
    <Container maxWidth={"xl"} className="w-full mt-[5%]">
      <div className="wishlist flex justify-center items-center mb-16">
        <div className="text">
          <p className="flex justify-center text-4xl font-bold text-[#424a63]">
            {t("myWishlist")}
          </p>
          <p className="text-[#aeb1bb] text-xl mt-2">
            {t("wishlistDescription")}
          </p>
        </div>
      </div>

      {loading && LocalStorageUtils.getAccessToken() ? (
        <div className="flex justify-center items-center min-h-screen">
          {" "}
          <Loader />
        </div>
      ) : (
        <div>
          {loading ? (
            <div className="flex justify-center items-center">
              {" "}
              <Loader />
            </div>
          ) : (
            <div className="ourProducts flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-9">
              {favourites.map((product) => (
                <WishCard
                  key={product._id}
                  product={product}
                  forceRender={forceRender}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default WishlistPage;
