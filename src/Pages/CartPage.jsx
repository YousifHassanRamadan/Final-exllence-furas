import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  HiOutlineTrash,
  HiOutlineShoppingBag,
  HiPlus,
  HiMinus,
} from "react-icons/hi";
import { deleteProductCart } from "../reduxSystem/slices/deleteCartProdSlice";
import { updateCartItem } from "../reduxSystem/slices/updataCartSlice";
import { clearCart } from "../reduxSystem/slices/clearUserCartSlice";
import PlaceOrder from "../components/PlaceOrder/PlaceOrder";
import { useTranslation } from "react-i18next";
import { fetchSingleProduct } from "../reduxSystem/slices/getSingleProdSlice";

const CartItem = ({ item }) => {
  const { t } = useTranslation();

  const [quantity, setQuantity] = useState(item.quantity);

  const dispatch = useDispatch();

  const { isRTL } = useSelector((state) => state.RTLState);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    const payload = item.variantInfo?.color
      ? { variantId: item.variantId, quantity: newQuantity }
      : { productId: item.productId, quantity: newQuantity };

    dispatch(updateCartItem(payload));
  };

  const incrementQuantity = () => {
    if (
      item.maxQuantityPossible >= item.quantity &&
      quantity < item.maxQuantityPossible
    ) {
      handleQuantityChange(quantity + 1);
    } else {
      toast.error(
        `Only ${item.maxQuantityPossible} items are available in stock!`
      );
    }
  };
  const decrementQuantity = () =>
    quantity > 1 && handleQuantityChange(quantity - 1);

  const handleRemoveItem = () => {
    dispatch(deleteProductCart(item.productId));
    toast.success(
      t("removed_from_cart", { title: isRTL ? item.arabicTitle : item.title }),
      {
        position: "bottom-right",
        autoClose: 3000,
      }
    );
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white rounded-xl p-4 mb-3 transition-all hover:shadow-lg">
      <div className="relative w-full sm:w-auto mx-auto sm:mx-0 mb-4 sm:mb-0">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full sm:w-20 h-40 sm:h-20 object-contain sm:object-cover rounded-lg border border-gray-100"
        />
        {item.variantInfo?.color && (
          <div
            className="absolute bottom-1 right-1 w-4 h-4 rounded-full border border-white"
            style={{ backgroundColor: item.variantInfo.color }}
          />
        )}
      </div>

      <div className="flex-1 w-full sm:w-auto">
        <h3 className="font-medium text-[#284980] text-lg">
          {isRTL ? item.arabicTitle : item.title}
        </h3>
        <div className="flex flex-wrap gap-2 text-sm text-gray-500 mt-1">
          {item.variantInfo?.size && (
            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-[#284980]">
              {t("size")}: {item.variantInfo.size}
            </span>
          )}
          {item.variantInfo?.color && (
            <span className="px-2 py-0.5 text-[#284980] bg-gray-100 rounded-full">
              {t("color")}: {item.variantInfo.color}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center w-full sm:w-auto gap-2 mt-4 sm:mt-0">
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={decrementQuantity}
            className="p-2 text-[#284980] hover:bg-gray-100 transition-colors"
            disabled={quantity <= 1}
          >
            <HiMinus size={16} />
          </button>
          <span className="px-3 py-1 font-medium text-[#284980]">
            {quantity}
          </span>
          <button
            onClick={incrementQuantity}
            className="p-2 text-[#284980] hover:bg-gray-100 transition-colors"
          >
            <HiPlus size={16} />
          </button>
        </div>

        <button
          onClick={handleRemoveItem}
          className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1 transition-colors"
        >
          <HiOutlineTrash /> {t("remove")}
        </button>
      </div>

      <div className="text-right mt-4 sm:mt-0 w-full sm:w-auto">
        <p className="font-semibold text-[#284980]">
          SAR {(item.price * quantity).toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">
          SAR {item.price.toFixed(2)} {t("each")}
        </p>
      </div>
    </div>
  );
};

const CartPage = () => {
  const { t } = useTranslation();
  const [isPlaceOrderOpen, setIsPlaceOrderOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userCart } = useSelector((state) => state.getCartState);

  const subtotal = userCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 5 : 0;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success(t("cart_cleared"), {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#284980]">{t("your_cart")}</h1>
        {userCart.length > 0 && (
          <button
            onClick={handleClearCart}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            <HiOutlineTrash /> {t("clear_cart")}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {userCart.length > 0 ? (
            <div className="space-y-3">
              {userCart.map((item, i) => (
                <CartItem key={i} item={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <HiOutlineShoppingBag size={40} />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-[#284980] mb-2">
                {t("cart_empty")}
              </h2>
              <p className="text-gray-500 mb-6">{t("cart_empty_desc")}</p>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                {t("continue_shopping")}
              </button>
            </div>
          )}
        </div>

        <div>
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8">
            <h2 className="text-xl font-semibold text-[#284980] mb-4">
              {t("order_summary")}
            </h2>

            <div className="space-y-3 border-b border-gray-100 pb-4 mb-4">
              <div className="flex justify-between text-[#284980]">
                <span>{t("subtotal")}</span>
                <span>SAR {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-[#284980]">
                <span>{t("shipping")}</span>
                {shipping === 0 ? (
                  <span className="text-green-500">{t("free")}</span>
                ) : (
                  <span>SAR {shipping.toFixed(2)}</span>
                )}
              </div>

              <div className="flex justify-between text-[#284980]">
                <span>{t("tax")} (7%)</span>
                <span>SAR {tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between font-semibold text-lg text-[#284980] mb-6">
              <span>{t("total")}</span>
              <span>SAR {total.toFixed(2)}</span>
            </div>

            {userCart.length > 0 && (
              <>
                <button
                  onClick={() => setIsPlaceOrderOpen(true)}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium mb-4"
                >
                  {t("checkout")}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {isPlaceOrderOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm z-50">
          <PlaceOrder setIsPlaceOrderOpen={setIsPlaceOrderOpen} />
        </div>
      )}
    </div>
  );
};

export default CartPage;
