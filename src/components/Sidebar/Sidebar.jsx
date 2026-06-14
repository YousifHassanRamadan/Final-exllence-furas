import React, { useMemo } from "react";
import {
  FaBox,
  FaSearch,
  FaHeart,
  FaMapMarkerAlt,
  FaUserCog,
  FaSignOutAlt,
  FaExpeditedssl,
  FaUserEdit,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../reduxSystem/slices/authSlice";
import { FaTruckRampBox } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";

import profileImg from "../../../assets/images/profile-dashboard/219983.webp";

const Sidebar = () => {
  const { t } = useTranslation();
  const { userData } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Debugging: Log userData to see what it holds
  // console.log("User Data:", userData);

  // Check if user is admin safely
  const isAdmin = userData?.userType?.toLowerCase() === "admin";

  const isSuperAdmin = userData?.userType.toLowerCase() === "superadmin";

  // console.log("isSuperAdmin", isSuperAdmin);

  // Define menu items dynamically
  const menuItems = useMemo(
    () => [
      ...(isAdmin || isSuperAdmin
        ? [
            {
              name: t("allProducts"),
              icon: <FaExpeditedssl />,
              path: "admin-dashboard",
            },
          ]
        : []),
      ...(isSuperAdmin
        ? [
            {
              name: t("super_admin_panel"),
              icon: <FaUserEdit className="text-lg" />,
              path: "manageuser",
            },
          ]
        : []),
      ...(isAdmin || isSuperAdmin
        ? [
            {
              name: t("all_orders"),
              icon: <FaTruckRampBox />,
              path: "all-orders",
            },
          ]
        : []),
      { name: t("orders"), icon: <FaBox />, path: "orders" },
      { name: t("wishlist"), icon: <FaHeart />, path: "mywishlist" },
      { name: t("addresses"), icon: <FaMapMarkerAlt />, path: "edit-address" },
      { name: t("accountDetails"), icon: <FaUserCog />, path: "edit-account" },
      { name: t("logOut"), icon: <FaSignOutAlt />, path: "" },
    ],
    [isAdmin, t]
  );

  return (
    <div className="md:w-64 w-full bg-[#284980] text-white md:min-h-screen h-auto p-6 flex flex-col items-center">
      <img
        src={profileImg}
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-white mb-4"
      />
      <p className="text-gray-400 text-sm mb-4 capitalize">
        {userData ? `${userData.fname} ${userData.lname}` : "User"}
      </p>
      <div className="w-full md:block flex justify-between overflow-x-auto">
        {menuItems.map((item, index) =>
          item.name === t("logOut") ? (
            <div
              key={index}
              onClick={() => {
                dispatch(logOut());
                navigate("/register");
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition whitespace-nowrap hover:bg-gray-800"
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ) : item.name === t("accountDetails") ? (
            <NavLink
              to={item.path}
              key={index}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition whitespace-nowrap ${
                  isActive ? "bg-yellow-500 text-black" : "hover:bg-gray-800"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
              {!userData?.isConfirmed && (
                <MdVerified className=" text-[#F0B100] " />
              )}
            </NavLink>
          ) : (
            <NavLink
              to={item.path}
              key={index}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition whitespace-nowrap ${
                  isActive ? "bg-yellow-500 text-black" : "hover:bg-gray-800"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
