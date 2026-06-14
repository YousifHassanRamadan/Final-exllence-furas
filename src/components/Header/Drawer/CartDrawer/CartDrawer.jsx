import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetisProductAdded } from "../../../../reduxSystem/slices/backAddToCartSlice";
import { resetisProdDeleted } from "../../../../reduxSystem/slices/deleteCartProdSlice";
import { resetEditCartState } from "../../../../reduxSystem/slices/updataCartSlice";
import { resetIsCartCleared } from "../../../../reduxSystem/slices/clearUserCartSlice";
import { IoCartOutline } from "react-icons/io5";
import { fetchCart } from "../../../../reduxSystem/slices/getUserCartSlice";
import { useTranslation } from "react-i18next";

const CartDrawer = ({ isRTL }) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const { userCart, totalCartPrice } = useSelector(
    (state) => state.getCartState
  );

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
  }, [isProductAdded, isProdDeleted, isEdited, isCartCleared]);

  return (
    <div
      className={`flex items-center cursor-pointer my-3 ${
        isRTL ? "pr-4" : "pl-4"
      }`}
    >
      <IoCartOutline className="text-white text-3xl" />
      {userCart.length > 0 && (
        <span
          className={`${
            isRTL ? "mr-2" : "ml-2"
          } bg-[#F0B100] text-[#284980] text-xs rounded-full w-5 h-5 flex justify-center items-center`}
        >
          {userCart.length}
        </span>
      )}
    </div>
  );
};

export default CartDrawer;
