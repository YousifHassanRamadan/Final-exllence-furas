import React, { useState, useEffect } from "react";
import FirstSec from "./First-Section/FirstSec";
import SecondSection from "./Second-Section/SecondSection";
import ThirdSec from "./Third-Section/ThirdSec";
import DrawerComp from "./Drawer/DrawerComp";
import { GiBeachBag } from "react-icons/gi";
import { Link } from "react-router-dom";
import { HomeIcon, FolderIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import SearchBarMobile from "./Second-Section/Search-bar-mobile/SearchBarMobile";
import { useDispatch, useSelector } from "react-redux";
import { resetisProductAdded } from "../../reduxSystem/slices/backAddToCartSlice";
import { fetchCart } from "../../reduxSystem/slices/getUserCartSlice";
import { resetisProdDeleted } from "../../reduxSystem/slices/deleteCartProdSlice";
import { resetEditCartState } from "../../reduxSystem/slices/updataCartSlice";
import { resetIsCartCleared } from "../../reduxSystem/slices/clearUserCartSlice";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineCompareArrows } from "react-icons/md";
import { LocalStorageUtils } from "../../utils/localStorageUtils";
import { useTranslation } from "react-i18next";
import { fetchFavorites } from "../../reduxSystem/slices/getFavouriteSlice";
import i18n from "../../i18n";
import { handelRTL } from "../../reduxSystem/slices/handleRTLSlice";

const MainHeader = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { isRTL } = useSelector((state) => state.RTLState);

  const booleanCond = true;

  // Check if current language is Arabic

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 937);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 937);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { userCart, totalCartPrice } = useSelector(
    (state) => state.getCartState,
  );

  const { isProductAdded } = useSelector((state) => state.AddToCartState);
  const { isProdDeleted } = useSelector((state) => state.deleteProdCart);
  const { isEdited } = useSelector((state) => state.editCartState);
  const { isCartCleared } = useSelector((state) => state.clearCartState);
  const { favourites } = useSelector((state) => state.getFavouritestate);
  const { compareProducts } = useSelector((state) => state.compareProductState);
  const { isLoading } = useSelector((state) => state.favouriteState);

  useEffect(() => {
    dispatch(fetchCart()).then(() => {
      dispatch(resetisProductAdded());
      dispatch(resetisProdDeleted());
      dispatch(resetEditCartState());
      dispatch(resetIsCartCleared());
    });
  }, [isProductAdded, isProdDeleted, isEdited, isCartCleared]);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [isLoading]);

  return (
    <div className="bg-[#284980] px-[10%] w-full">
      <div
        className={`container mx-auto ${isRTL ? "rtl" : "ltr"}`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* شاشة كبيرة */}
        {isLargeScreen ? (
          <div>
            <div className="sec1 w-full">
              <FirstSec />
            </div>

            <div className="w-full opacity-[8%] h-[2px] rounded bg-white px-9"></div>

            <div className="sec2">
              <SecondSection />
            </div>

            <div className="w-full opacity-[8%] h-[2px] rounded bg-white px-9"></div>

            <div className="sec3">
              <ThirdSec />
            </div>
          </div>
        ) : (
          // شاشة صغيرة
          <div className="py-6 sm:px-10">
            <div className="flex items-center justify-between">
              {/* اللوجو */}
              <Link to={"/"} className={`flex items-center w-[60%] sm:w-[50%]`}>
                <p
                  className={`pl-3 pr-2 text-white text-3xl cursor-pointer flex ${
                    isRTL && "flex-row-reverse"
                  } `}
                >
                  <span className={`text-[#f8c530] ${isRTL ? "mr-2" : "mr-2"}`}>
                    {t("logo_excellence")}
                  </span>{" "}
                </p>
              </Link>

              {/* Drawer */}

              <div className="relative z-[10]">
                <DrawerComp />
                {userCart.length > 0 && (
                  <span
                    className={`absolute -top-2 ${
                      isRTL ? "-left-3" : "-right-3"
                    } bg-[#F0B100] text-[#284980] text-xs rounded-full w-5 h-5 flex justify-center items-center`}
                  >
                    {userCart.length}
                  </span>
                )}
              </div>
            </div>

            <div className="w-full opacity-[8%] h-[2px] rounded bg-white px-9 my-5"></div>

            <div className="flex items-center justify-between">
              <div className="w-full">
                <SearchBarMobile />
              </div>
            </div>

            {/** أزرار التنقل السفلي */}
            <nav className="fixed bottom-0 left-0 w-full bg-[#284980] text-white flex justify-around py-3 md:hidden shadow-lg z-[1000]">
              <Link to={"/"} className="flex flex-col items-center">
                <HomeIcon className="w-6 h-6" aria-label="Home Icon" />
                <span className="text-xs">{isRTL ? "الرئيسية" : "Home"}</span>
              </Link>

              <Link
                to={"/compare"}
                className="flex flex-col items-center relative"
              >
                <MdOutlineCompareArrows
                  className="text-white text-2xl"
                  aria-label="Compare Products Icon"
                />
                <span className="text-xs mt-1">
                  {isRTL ? "مقارنة" : "Compare"}
                </span>
                {compareProducts.length > 0 && (
                  <span
                    className={`absolute -top-1 ${
                      isRTL ? "left-2" : "right-2"
                    } bg-[#F0B100] text-[#284980] text-xs rounded-full w-5 h-5 flex justify-center items-center`}
                  >
                    {compareProducts.length}
                  </span>
                )}
              </Link>

              <Link
                to={"/wishlist"}
                className="flex flex-col items-center relative"
              >
                <FaRegHeart
                  aria-label="Wishlist Icon"
                  className="text-white text-2xl"
                />
                <span className="text-xs mt-1">
                  {isRTL ? "المفضلة" : "Favourite"}
                </span>
                {favourites.length > 0 &&
                  LocalStorageUtils.getAccessToken() && (
                    <span
                      className={`absolute -top-1 ${
                        isRTL ? "left-2" : "right-2"
                      } bg-[#F0B100] text-[#284980] text-xs rounded-full w-5 h-5 flex justify-center items-center`}
                    >
                      {favourites.length}
                    </span>
                  )}
              </Link>

              <Link to={"/my-account"} className="flex flex-col items-center">
                <UserIcon className="w-6 h-6" aria-label="Account Icon" />
                <span className="text-xs">{isRTL ? "حسابي" : "Account"}</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
