import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popover, Transition } from "@headlessui/react";
import { HiOutlineShoppingBag, HiX, HiArrowRight } from "react-icons/hi";
import { removeFromCart } from "../../../../reduxSystem/slices/addToCartSlice";
import { fetchCart } from "../../../../reduxSystem/slices/getUserCartSlice";
import { resetisProductAdded } from "../../../../reduxSystem/slices/backAddToCartSlice";
import { resetisProdDeleted } from "../../../../reduxSystem/slices/deleteCartProdSlice";
import { resetEditCartState } from "../../../../reduxSystem/slices/updataCartSlice";
import { resetIsCartCleared } from "../../../../reduxSystem/slices/clearUserCartSlice";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const isRTL = i18n.language === "ar" || i18n.dir() === "rtl";

  const { userCart, totalCartPrice } = useSelector(
    (state) => state.getCartState
  );

  console.log("userCart", userCart);

  const { isProductAdded } = useSelector((state) => state.AddToCartState);
  const { isProdDeleted } = useSelector((state) => state.deleteProdCart);
  const { isEdited } = useSelector((state) => state.editCartState);
  const { isCartCleared } = useSelector((state) => state.clearCartState);

  useEffect(() => {
    dispatch(fetchCart()).then(() => {
      dispatch(resetisProductAdded());
      dispatch(resetisProdDeleted());
      dispatch(resetEditCartState());
      dispatch(resetIsCartCleared());
    });
  }, [isProductAdded, isProdDeleted, isEdited, isCartCleared, dispatch]);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="relative flex items-center justify-center outline-none focus:outline-none">
            <div className="relative p-2 rounded-full hover:bg-indigo-700/20 transition-colors">
              <HiOutlineShoppingBag className="text-white text-2xl" />
              {userCart.length > 0 && (
                <span
                  className={`absolute -top-1 bg-[#F0B100] text-[#284980] text-xs font-medium rounded-full w-5 h-5 flex justify-center items-center ${
                    isRTL ? "-left-1" : "-right-1"
                  }`}
                >
                  {userCart.length}
                </span>
              )}
            </div>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className={`absolute z-50 mt-2 w-80 sm:w-96 ${
                isRTL ? "left-0" : "right-0"
              }`}
            >
              <div className="overflow-hidden rounded-lg shadow-lg">
                <div className="bg-white p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-800">
                      {t("shopping_cart")}
                    </h3>
                    <span className="text-sm text-gray-500 font-medium">
                      {userCart.length}{" "}
                      {userCart.length === 1 ? t("item") : t("items")}
                    </span>
                  </div>

                  {userCart.length > 0 ? (
                    <>
                      <div
                        className={`max-h-80 overflow-y-auto space-y-3 ${
                          isRTL ? "pl-1" : "pr-1"
                        }`}
                      >
                        {userCart.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center py-3 border-b border-gray-100 last:border-0"
                          >
                            <div className="relative flex-shrink-0">
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                              {item.variantInfo?.color && (
                                <div
                                  className={`absolute bottom-1 w-3 h-3 rounded-full border border-white ${
                                    isRTL ? "left-1" : "right-1"
                                  }`}
                                  style={{
                                    backgroundColor: item.variantInfo.color,
                                  }}
                                />
                              )}
                            </div>

                            <div
                              className={`flex-1 ${isRTL ? "mr-3" : "ml-3"}`}
                            >
                              <h4 className="text-sm font-medium text-gray-800 line-clamp-1">
                                {isRTL ? item.arabicTitle : item.title}
                              </h4>

                              <div className="flex flex-wrap gap-1 mt-1">
                                {item.variantInfo?.size && (
                                  <span className="text-xs text-gray-500">
                                    {t("size")}: {item.variantInfo.size}
                                  </span>
                                )}
                                {item.variantInfo?.size &&
                                  item.variantInfo?.color && (
                                    <span className="text-xs text-gray-500 mx-1">
                                      •
                                    </span>
                                  )}
                                {item.variantInfo?.color && (
                                  <span className="text-xs text-gray-500">
                                    {t("color")}: {item.variantInfo.color}
                                  </span>
                                )}
                              </div>

                              <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-500">
                                  {item.quantity} SAR {item.price.toFixed(2)}
                                </span>
                                <span className="text-sm font-medium text-gray-800">
                                  SAR {(item.quantity * item.price).toFixed(2)}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleRemoveItem(item.productId)}
                              className={`p-1 text-gray-400 hover:text-red-500 transition-colors ${
                                isRTL ? "mr-2" : "ml-2"
                              }`}
                              aria-label={t("remove_item")}
                            >
                              <HiX size={16} />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-600">{t("subtotal")}</span>
                          <span className="text-lg font-semibold text-gray-800">
                            SAR {totalCartPrice.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Link
                            to="/cart"
                            className="flex-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium text-center transition-colors"
                          >
                            {t("view_cart")}
                          </Link>
                          <Link
                            to="/cart"
                            className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium text-center transition-colors flex items-center justify-center"
                          >
                            {t("checkout")}{" "}
                            <HiArrowRight
                              className={`${
                                isRTL ? "mr-1 rotate-180" : "ml-1"
                              }`}
                              size={16}
                            />
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="py-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <HiOutlineShoppingBag
                          className="text-gray-400"
                          size={24}
                        />
                      </div>
                      <h3 className="text-gray-800 font-medium mb-1">
                        {t("cart_empty")}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4">
                        {t("cart_empty_desc")}
                      </p>
                      <Popover.Button
                        as={Link}
                        to="/"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                      >
                        {t("continue_shopping")}
                      </Popover.Button>
                    </div>
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Cart;
