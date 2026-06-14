import React, { useState, useEffect } from "react";
import { Drawer, Button, IconButton, Tooltip } from "@material-tailwind/react";
import { IoMdMenu } from "react-icons/io";
import BrowseCollectionDrawer from "./BrowseCollection/BrowseCollectionDrawer";
import QuickFindDrawer from "./QuickFind/QuickFindDrawer";
import ContactDrawer from "./Contact/ContactDrawer";
import { Link } from "react-router-dom";
import { GiBeachBag } from "react-icons/gi";
import { SlSocialFacebook } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CartDrawer from "./CartDrawer/CartDrawer";
import LogInOrMyAcc from "./LogInOrMyAcc/LogInOrMyAcc";
import { useSelector } from "react-redux";

const DrawerComp = () => {
  const [isOpenDrawer, setOpenDrawer] = useState(false);

  const openDrawer = () => setOpenDrawer(true);
  const closeDrawer = () => setOpenDrawer(false);

  const { i18n, t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Check if current language is Arabic
  const { isRTL } = useSelector((state) => state.RTLState);

  // ✅ change language function
  const changeLanguage = (lang) => {
    const langCode = lang === "en" ? "en_US" : "ar_AE";

    setSearchParams({
      ...Object.fromEntries(searchParams),
      language: langCode,
    });

    i18n.changeLanguage(langCode);
  };

  const faceAndTwitterStyle = `w-full transition-transform hover:bg-blue-500 bg-[#284980] border-none shadow-none rounded-4xl px-2 duration-500 hover:scale-125 hover:rounded-4xl`;

  const instaStyle = `w-full transition-transform hover:bg-[#e44c6b] bg-[#284980] border-none shadow-none rounded-4xl px-2 duration-500 hover:scale-125 hover:rounded-4xl`;

  useEffect(() => {
    if (isOpenDrawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenDrawer]);

  return (
    <React.Fragment>
      <Button
        onClick={openDrawer}
        className="bg-white text-[#284980] sm:p-3 sm:rounded-4xl sm:text-xl text-2xl p-2 rounded-4xl"
      >
        <IoMdMenu aria-label="Menu Icon" />
      </Button>
      <Drawer
        placement={isRTL ? "left" : "right"}
        open={isOpenDrawer}
        onClose={closeDrawer}
        className={`p-0 bg-[#284980] backdrop-blur-lg min-h-[100vh] overflow-y-auto z-[100000000]`}
        dir={isRTL ? "rtl" : "ltr"}
        overlayProps={{
          className: "bg-black/20 backdrop-blur-md",
        }}
      >
        {/**Header */}
        <div
          className={`mb-6 flex items-center justify-between ${
            isRTL ? "pr-4" : "pl-4"
          } pt-4`}
        >
          <Link
            to={"/"}
            className="flex items-center w-[70%]"
            onClick={closeDrawer}
          >
            <GiBeachBag
              className="text-white text-4xl cursor-pointer"
              aria-label="Logo Icon"
            />
            <p
              className={`${
                isRTL ? "mr-2" : "ml-2"
              } text-white text-lg sm:text-2xl cursor-pointer`}
            >
              <span className="text-[#f8c530]">Excellence</span> Furas
            </p>
          </Link>

          <IconButton
            variant="text"
            color="white"
            onClick={closeDrawer}
            className={`${isRTL ? "ml-4" : "mr-4"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
              aria-label="Close Icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        <div className="w-full opacity-[8%] h-[2px] rounded bg-white"></div>
        <div className={`${isRTL ? "text-right" : "text-left"}`}>
          <BrowseCollectionDrawer closeDrawerRight={closeDrawer} />
        </div>
        <div className="w-full opacity-[8%] h-[2px] rounded bg-white"></div>

        <div className={`${isRTL ? "text-right" : "text-left"}`}>
          <QuickFindDrawer closeDrawerRight={closeDrawer} />
        </div>
        <div className="w-full opacity-[8%] h-[2px] rounded bg-white"></div>

        <div className={`${isRTL ? "text-right" : "text-left"}`}>
          <ContactDrawer closeDrawerRight={closeDrawer} isRTL={isRTL} />
        </div>
        <div className="w-full opacity-[8%] h-[2px] rounded bg-white"></div>

        <Link to={"/cart"} onClick={() => closeDrawer()} className="py-6 block">
          <div className={`${isRTL ? "text-right" : "text-left"}`}>
            <CartDrawer closeDrawerRight={closeDrawer} isRTL={isRTL} />
          </div>
        </Link>

        <div className="w-full opacity-[8%] h-[2px] rounded bg-white"></div>

        <div className={`${isRTL ? "text-right" : "text-left"}`}>
          <LogInOrMyAcc closeDrawerRight={closeDrawer} isRTL={isRTL} />
        </div>

        <div className="mt-6 w-full flex justify-center">
          <div className="socialMedia flex items-center justify-between w-[60%]">
            <div className="Facebook">
              <Tooltip
                content="Facebook"
                className="bg-[#f8c530] text-[#284980]"
              >
                <Button className={faceAndTwitterStyle} size="sm">
                  <SlSocialFacebook
                    title="Facebook"
                    className="text-xl"
                    aria-label="Facebook Icon"
                  />
                </Button>
              </Tooltip>
            </div>

            <div className="mx-1"></div>

            <div className="Instagram">
              <Tooltip
                content="Instagram"
                className="bg-[#f8c530] text-[#284980]"
              >
                <Button className={instaStyle} size="sm">
                  <FaInstagram
                    title="Instagram"
                    className="text-xl"
                    aria-label="Instagram Icon"
                  />
                </Button>
              </Tooltip>
            </div>

            <div className="mx-1"></div>

            <div className="Twitter">
              <Tooltip
                content="Twitter"
                className="bg-[#f8c530] text-[#284980]"
              >
                <Button className={faceAndTwitterStyle} size="sm">
                  <FaTwitter
                    title="Twitter"
                    className="text-xl"
                    aria-label="Twitter Icon"
                  />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full flex justify-center mb-6">
          <div className="language flex items-center gap-3">
            <Tooltip className="bg-[#f8c530] text-[#284980]">
              <Button
                onClick={() => {
                  changeLanguage("ar");
                  closeDrawer();
                }}
                className={`rounded-full p-2 w-9 h-9 min-w-0 ${
                  isRTL
                    ? "bg-[#f8c530] text-[#284980]"
                    : "bg-white text-[#284980]"
                } hover:bg-[#393527] hover:text-[#284980] text-sm shadow-none transition-all duration-300`}
              >
                ع
              </Button>
            </Tooltip>

            <Tooltip className="bg-[#f8c530] text-[#284980]">
              <Button
                onClick={() => {
                  changeLanguage("en");
                  closeDrawer();
                }}
                className={`rounded-full p-2 w-9 h-9 min-w-0 ${
                  !isRTL
                    ? "bg-[#f8c530] text-[#284980]"
                    : "bg-white text-[#284980]"
                } hover:bg-[#f8c530] hover:text-[#284980] text-sm shadow-none transition-all duration-300`}
              >
                EN
              </Button>
            </Tooltip>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default DrawerComp;
