import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Sidebar from "../components/Sidebar/Sidebar";
import { useEffect } from "react";
import i18n from "../i18n";
import LogInAndSignUp from "./LogInAndSignUp";
import { LocalStorageUtils } from "../utils/localStorageUtils";

const AccountPage = () => {
  const isAuthenticated = !!LocalStorageUtils.getAccessToken(); // Example auth check (NOT working)

  if (!isAuthenticated) {
    return <LogInAndSignUp />; // Render login page
  }

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <Container maxWidth="lg" className="min-h-[100vh] my-[7%]">
      <div className="dashboard-layout flex md:flex-row flex-col">
        {/* <Sidebar />  Static sidebar for user navigation */}
        <Sidebar />
        <Outlet /> {/* Dynamic content (orders, wishlist, etc.) */}
      </div>
    </Container>
  );
};

export default AccountPage;
