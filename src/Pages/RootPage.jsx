import { useSearchParams, Outlet } from "react-router-dom";
import { useEffect } from "react";
import MainHeader from "../components/Header/MainHeader";
import Footer from "../components/Footer/Footer";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { handelRTL } from "../reduxSystem/slices/handleRTLSlice";
import { setCart } from "../reduxSystem/slices/addToCartSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import i18n from "../i18n";

const RootPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // it's a hook to get the URLSearchParams object

  const { i18n } = useTranslation();

  const dispatch = useDispatch();

  //for reading the language from the query, or using the current i18next language as a default
  const language = searchParams?.get("language") || i18n?.language || "en_US";

  useEffect(() => {
    //  if the language is not equal to "en_US" or "ar_AE" set it to "en_US"
    if (!["en_US", "ar_AE"].includes(language)) {
      setSearchParams({
        ...Object.fromEntries(searchParams), // we used Object.fromEntries to convert URLSearchParams to object to be able to edit it
        language: "en_US",
      });
    } else {
      //  change the language if it's not equal to the current language
      if (i18n?.language !== language) {
        i18n.changeLanguage(language);
      }

      // تطبيق التغييرات بشكل متزامن
      if (language === "ar_AE") {
        document.dir = "rtl";
        document.documentElement.classList.add("rtl-mode");
        dispatch(handelRTL(true));
      } else {
        document.dir = "ltr";
        document.documentElement.classList.remove("rtl-mode");
        dispatch(handelRTL(false));
      }
    }
  }, [language, i18n, setSearchParams, dispatch]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");

    if (storedCart) {
      const cart = JSON.parse(storedCart);
      // console.log("stored cart", cart);
      dispatch(setCart(cart));
    }
  }, [dispatch]); // أضفنا dispatch كتبعية

  return (
    <div className="w-full overflow-x-hidden">
      <Helmet>
        <title>Excellence Furas - E-commerce</title>
        <meta
          name="description"
          content="Welcome to Excellence Furas, your one-stop shop for all your e-commerce needs. Browse our wide range of products and enjoy special offers."
        />
        <meta
          name="keywords"
          content="e-commerce, online shopping, special offers, electronics, home appliance, sports, furniture, entertainment, supermarket, mobile phones, laptops, tablets, cameras, kitchen appliances, fitness equipment, clothing, shoes, accessories, beauty products, toys, books, music, movies, video games, groceries, health products, outdoor gear, pet supplies, office supplies, automotive products"
        />
        {/* إضافة CSS خاص بالـ RTL لتصحيح المساحات */}
        <style type="text/css">
          {`
            html.rtl-mode .some-class-with-padding {
              padding-right: 0;
              padding-left: inherit;
            }
            html.rtl-mode, html[dir="rtl"] {
              margin: 0;
              padding: 0;
              overflow-x: hidden;
            }
            body {
              margin: 0;
              padding: 0;
              overflow-x: hidden;
            }
          `}
        </style>
      </Helmet>
      <MainHeader />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        rtl={language === "ar_AE"}
      />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootPage;
