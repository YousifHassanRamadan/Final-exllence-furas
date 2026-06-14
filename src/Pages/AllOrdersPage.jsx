import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../reduxSystem/slices/getAllOrdersSlice";
import {
  resetIsStatusEdited,
  updateOrderStatus,
} from "../reduxSystem/slices/editOrderStatusSlice";
import Loader from "../components/loader/Loader";
import {
  MapPin,
  Phone,
  CreditCard,
  Package,
  Calendar,
  DollarSign,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const AllOrdersPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(
    (state) => state.allOrdersState
  );

  const { isStatusEdited } = useSelector((state) => state.editOrderStatusState);

  // Filter state
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [expandedOrders, setExpandedOrders] = useState(new Set());

  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  useEffect(() => {
    dispatch(getAllOrders()).then(() => {
      dispatch(resetIsStatusEdited());
    });
  }, [dispatch, isStatusEdited]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

  const toggleOrderExpansion = (orderId) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
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

  // Helper function to safely get user display name
  const getUserDisplayName = (userId) => {
    if (!userId) return t("guest");

    if (typeof userId === "object") {
      const { fname, lname, email } = userId;
      if (fname || lname) {
        return `${fname || ""} ${lname || ""}`.trim();
      }
      if (email) {
        return email;
      }
      if (userId._id) {
        return `${t("user")}: ${userId._id}`;
      }
    }

    if (typeof userId === "string") {
      return `${t("user")}: ${userId}`;
    }

    return t("guest");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "processing":
        return "bg-blue-500";
      case "shipped":
        return "bg-purple-500";
      case "delivered":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600";
      case "completed":
        return "text-green-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-[#f2f2f2] min-h-screen p-6 w-full">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📦 {t("order_management")}
          </h1>
          <p className="text-gray-600">{t("manage_and_track_orders")}</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <label className="font-semibold text-gray-700">
                {t("filter_by_status")}
              </label>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">{t("all_orders")}</option>
                <option value="pending">{t("pending")}</option>
                <option value="processing">{t("processing")}</option>
                <option value="shipped">{t("shipped")}</option>
                <option value="delivered">{t("delivered")}</option>
                <option value="cancelled">{t("cancelled")}</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              {t("total")}: {filteredOrders.length} {t("orders")}
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {t("error")}: {error}
          </div>
        )}

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const isExpanded = expandedOrders.has(order._id);
              return (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-medium text-gray-500">
                            {t("order_id")}
                          </span>
                        </div>
                        <p className="font-mono text-sm text-gray-800 bg-gray-100 px-2 py-1 rounded">
                          {order._id}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleOrderExpansion(order._id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {isExpanded ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {t(order.status)}
                      </span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          SAR {order.totalAmount?.toFixed(2) || "0.00"}
                        </div>
                        <div
                          className={`text-xs ${getPaymentStatusColor(
                            order.paymentStatus
                          )}`}
                        >
                          {t("payment")}:{" "}
                          {order.paymentStatus ? t(order.paymentStatus) : "N/A"}
                        </div>
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-1  gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{t("user")}:</span>
                        <span className="font-medium text-gray-800 truncate">
                          {getUserDisplayName(order.userId)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{t("phone")}:</span>
                        <span className="font-medium text-gray-800">
                          {order.phone || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{t("payment")}:</span>
                        <span className="font-medium text-gray-800 uppercase">
                          {order.paymentMethod || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{t("created")}:</span>
                        <span className="font-medium text-gray-800 text-xs">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="p-6 space-y-6">
                      {/* Address Information */}
                      {order.address && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <MapPin className="w-4 h-4 text-red-500" />
                            <h4 className="font-semibold text-gray-800">
                              {t("delivery_address")}
                            </h4>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-1">
                            <p>
                              <span className="font-medium">
                                {t("street")}:
                              </span>{" "}
                              {order.address.street}
                            </p>
                            {order.address.homeAddress && (
                              <p>
                                <span className="font-medium">
                                  {t("apartment")}:
                                </span>{" "}
                                {order.address.homeAddress}
                              </p>
                            )}
                            <p>
                              <span className="font-medium">{t("city")}:</span>{" "}
                              {order.address.city}, {order.address.state}
                            </p>
                            <p>
                              <span className="font-medium">
                                {t("country")}:
                              </span>{" "}
                              {order.address.country} {order.address.zipCode}
                            </p>
                            {order.address.landmark && (
                              <p>
                                <span className="font-medium">
                                  {t("landmark")}:
                                </span>{" "}
                                {order.address.landmark}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Order Items */}
                      {order.items && order.items.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Package className="w-4 h-4 text-blue-500" />
                            <h4 className="font-semibold text-gray-800">
                              {t("order_items")}
                            </h4>
                          </div>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div
                                key={item._id || index}
                                className="bg-gray-50 p-3 rounded-lg flex justify-between items-center"
                              >
                                <div>
                                  <p className="text-sm">
                                    <span className="font-medium">
                                      {t("product_id")}:
                                    </span>{" "}
                                    {item.productId || "N/A"}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {t("quantity")}: {item.quantity} × SAR{" "}
                                    {item.price?.toFixed(2) || "0.00"}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-green-600">
                                    SAR
                                    {(
                                      (item.quantity || 0) * (item.price || 0)
                                    ).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Timestamps */}
                      <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">{t("created")}:</span>{" "}
                          {formatDate(order.createdAt)}
                        </p>
                        <p>
                          <span className="font-medium">
                            {t("last_updated")}:
                          </span>{" "}
                          {formatDate(order.updatedAt)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Status Update Section */}
                  <div className="p-6 bg-gray-50 border-t">
                    <label className="block font-semibold text-gray-800 mb-2">
                      {t("update_order_status")}
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="pending">{t("pending")}</option>
                      <option value="processing">{t("processing")}</option>
                      <option value="shipped">{t("shipped")}</option>
                      <option value="delivered">{t("delivered")}</option>
                      <option value="cancelled">{t("cancelled")}</option>
                    </select>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">{t("no_orders_found")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOrdersPage;
