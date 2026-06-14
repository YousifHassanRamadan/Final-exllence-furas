import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../reduxSystem/slices/getAllUsersSlice";
import {
  removedIsRemoveAdmin,
  removeUserAsAdmin,
} from "../../reduxSystem/slices/removeAdminSlice";
import {
  resetIsAdminEdited,
  setUserAsAdmin,
} from "../../reduxSystem/slices/editRoleUsersSlice";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const ManageAdmin = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.getAllUsersState);
  const { isRemoveAdmin } = useSelector((state) => state.removeAdminState);
  const { isAdminEdited } = useSelector((state) => state.setAdminState);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchAllUsers(searchQuery)).then(() => {
      dispatch(removedIsRemoveAdmin());
      dispatch(resetIsAdminEdited());
    });
  }, [dispatch, searchQuery, isRemoveAdmin, isAdminEdited]);

  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: t("are_you_sure"),
      text: t("grant_admin_warning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#6c757d",
      confirmButtonText: t("yes_make_admin"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setUserAsAdmin(id));
        Swal.fire(t("success"), t("user_now_admin"), "success");
      }
    });
  };

  const handleRemoveAdmin = (id) => {
    Swal.fire({
      title: t("are_you_sure"),
      text: t("remove_admin_warning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: t("yes_remove_admin"),
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeUserAsAdmin(id));
        Swal.fire(t("success"), t("user_no_longer_admin"), "success");
      }
    });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* 🔹 شريط البحث */}
      <input
        type="text"
        placeholder={t("search_by_name")}
        className="mb-6 px-4 py-2 w-80 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : users && users.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {users.map((user) => {
            const initial = `${user.lname[0]}${user.fname[0]}`.toUpperCase();

            return (
              <div
                key={user._id}
                className="bg-white shadow-lg rounded-lg p-6 w-80 text-center h-fit"
              >
                <div className="mx-auto mb-4 w-24 h-24 flex items-center justify-center rounded-full bg-gray-300 text-gray-800 text-3xl font-bold">
                  {initial}
                </div>
                <h2 className="text-xl font-semibold">
                  {user.fname.charAt(0).toUpperCase() + user.fname.slice(1)}{" "}
                  {user.lname.charAt(0).toUpperCase() + user.lname.slice(1)}
                </h2>
                <p className="text-gray-600">{user.userType}</p>
                <div className="mt-4 flex justify-center gap-4 flex-col">
                  {user.userType === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg duration-300 hover:bg-red-600"
                    >
                      {t("remove_admin")}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg duration-300 hover:bg-blue-600"
                    >
                      {t("make_admin")}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600">{t("no_users_found")}</p>
      )}
    </div>
  );
};

export default ManageAdmin;
