import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../loader/Loader";

export const ProtectedRoute = () => {
  const { isLogged, logInLoading } = useSelector((state) => state.authState);

  const location = useLocation();

  if (logInLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <Loader />
      </div>
    );
  }

  // Redirect to login page if not authenticated
  if (!isLogged) {
    return <Navigate to="register" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

// Route wrapper for admin-only pages
export const AdminProtectedRoute = () => {
  const { isLogged, logInLoading, userData } = useSelector(
    (state) => state.authState
  );
  const location = useLocation();

  // Show loader while checking authentication
  if (logInLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <Loader />
      </div>
    );
  }

  // Redirect to login page if not authenticated
  if (!isLogged) {
    return <Navigate to="register" state={{ from: location }} replace />;
  }

  // Redirect to account page if user is not an admin or superAdmin
  if (
    userData &&
    userData.userType !== "admin" &&
    userData.userType !== "superAdmin"
  ) {
    return <Navigate to="/my-account" replace />;
  }

  // Allow access to the admin protected route
  return <Outlet />;
};

// Route wrapper specifically for superAdmin-only pages
export const SuperAdminProtectedRoute = () => {
  const { isLogged, logInLoading, userData } = useSelector(
    (state) => state.authState
  );
  const location = useLocation();

  // Show loader while checking authentication
  if (logInLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <Loader />
      </div>
    );
  }

  // Redirect to login page if not authenticated
  if (!isLogged) {
    return <Navigate to="register" state={{ from: location }} replace />;
  }

  // Redirect to account page if user is not a superAdmin
  if (userData && userData.userType !== "superAdmin") {
    return <Navigate to="/my-account" replace />;
  }

  // Allow access to the superAdmin protected route
  return <Outlet />;
};
