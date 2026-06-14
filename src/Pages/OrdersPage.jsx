import React, { useEffect } from "react";
import {
  FaBox,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaCreditCard,
  FaCalendarAlt,
  FaShoppingCart,
  FaExclamationTriangle,
  FaCog,
  FaTruck,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../reduxSystem/slices/getUserOrderSlice";
import Loader from "../components/loader/Loader";

const OrdersPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.ordersUserState);

  console.log("orders", orders);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaClock className="text-yellow-500 text-xl" />;
      case "processing":
        return <FaCog className="text-blue-500 text-xl animate-spin" />;
      case "shipped":
        return <FaTruck className="text-purple-500 text-xl" />;
      case "delivered":
        return <FaCheckCircle className="text-green-500 text-xl" />;
      case "cancelled":
        return <FaExclamationTriangle className="text-red-500 text-xl" />;
      default:
        return <FaClock className="text-yellow-500 text-xl" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAddress = (address) => {
    const parts = [
      address.homeAddress,
      address.city,
      address.state,
      address.country,
    ].filter(Boolean);
    return parts.join(", ");
  };

  return (
    <div className="bg-[#f2f2f2] w-full min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-[#284980] mb-2">
            {t("my_orders")}
          </h2>
          <p className="text-gray-600">{t("track_and_manage_orders")}</p>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white p-12 shadow-xl rounded-2xl max-w-md mx-auto">
            <FaBox className="text-gray-300 text-8xl mb-6" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {t("no_orders_yet")}
            </h3>
            <p className="text-gray-500 text-center mb-6">
              {t("no_order_made_yet")}
            </p>
            <Link
              to="/"
              className="bg-[#284980] text-white px-8 py-3 rounded-xl shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              {t("back_to_shop")}
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Header Section */}
                <div className="bg-gradient-to-r from-[#284980] to-blue-600 text-white p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="text-lg font-semibold flex items-center">
                        <FaShoppingCart className="mr-2" />
                        {t("order_id")}: #{order._id.slice(-8)}
                      </h3>
                      <p className="text-blue-100 flex items-center mt-1">
                        <FaCalendarAlt className="mr-2 text-sm" />
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div
                        className={`px-4 py-2 rounded-full border ${getStatusColor(
                          order.status
                        )} font-medium`}
                      >
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{t(order.status)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Order Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {/* Total Amount */}
                    <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl border border-green-200">
                      <FaMoneyBillWave className="text-green-600 text-2xl" />
                      <div>
                        <p className="text-sm text-gray-600">
                          {t("total_amount")}
                        </p>
                        <p className="text-xl font-bold text-green-700">
                          SAR {order.totalAmount}
                        </p>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <FaCreditCard className="text-blue-600 text-2xl" />
                      <div>
                        <p className="text-sm text-gray-600">
                          {t("payment_method")}
                        </p>
                        <p className="text-lg font-semibold text-blue-700 capitalize">
                          {order.paymentMethod === "cod"
                            ? t("cash_on_delivery")
                            : order.paymentMethod}
                        </p>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <FaPhone className="text-purple-600 text-2xl" />
                      <div>
                        <p className="text-sm text-gray-600">{t("phone")}</p>
                        <p className="text-lg font-semibold text-purple-700">
                          {order.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <FaMapMarkerAlt className="text-gray-600 text-xl flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">
                          {t("delivery_address")}
                        </p>
                        <p className="text-gray-800 font-medium">
                          {formatAddress(order.address)}
                        </p>
                        {order.address.zipCode && (
                          <p className="text-sm text-gray-600 mt-1">
                            {t("zip")}: {order.address.zipCode}
                          </p>
                        )}
                        {order.address.landmark && (
                          <p className="text-sm text-gray-600">
                            {t("landmark")}: {order.address.landmark}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <FaBox className="mr-2 text-[#284980]" />
                      {t("order_items")} ({order.items.length})
                    </h4>
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl bg-gray-50"
                        >
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.title}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                          />
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-800 mb-1">
                              {item.product.title}
                            </h5>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {item.product.description}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-gray-600">
                                {t("quantity")}: {item.quantity}
                              </span>
                              <span className="font-bold text-[#284980]">
                                SAR {item.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
