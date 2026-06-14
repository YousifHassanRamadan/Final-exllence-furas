import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../../reduxSystem/slices/getDashboardStatusSlice";
import { FaUsers, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const DashboardStats = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { stats } = useSelector((state) => state.dashboardStatsState);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  return (
    <div className="flex justify-start items-start py-9 min-h-fit bg-gray-100">
      <div className="grid grid-cols-1 gap-6 w-full max-w-4xl mx-4">
        {/* Total Users */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
          <div className="text-blue-500 bg-blue-100 p-4 rounded-full">
            <FaUsers size={30} />
          </div>
          <div>
            <h3 className="text-gray-600 text-lg font-semibold">
              {t("total_users")}
            </h3>
            <p className="text-2xl font-bold">{stats?.totalUsers || 0}</p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
          <div className="text-green-500 bg-green-100 p-4 rounded-full">
            <FaShoppingCart size={30} />
          </div>
          <div>
            <h3 className="text-gray-600 text-lg font-semibold">
              {t("total_orders")}
            </h3>
            <p className="text-2xl font-bold">{stats?.totalOrders || 0}</p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
          <div className="text-yellow-500 bg-yellow-100 p-4 rounded-full">
            <FaDollarSign size={30} />
          </div>
          <div>
            <h3 className="text-gray-600 text-lg font-semibold">
              {t("total_revenue")}
            </h3>
            <p className="sm:text-2xl text-xl font-bold">
              SAR {stats?.totalRevenue?.toFixed(1) || "0.00"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
