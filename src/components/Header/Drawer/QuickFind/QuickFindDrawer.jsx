import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, LinkIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../../../reduxSystem/slices/getAllCategorySlice";

const QuickFindDrawer = ({ closeDrawerRight }) => {
  const { isRTL } = useSelector((state) => state.RTLState);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const { Allcategories } = useSelector((state) => state.getCategoryState);
  const { isLogged } = useSelector((state) => state.authState);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const quickAccessLinks = [
    {
      label: t("my_account"),
      to: isLogged ? "/my-account" : "/register",
    },
    {
      label: t("orders"),
      to: isLogged ? "/my-account/orders" : "/register",
    },
    {
      label: t("lost_password"),
      to: isLogged ? "/my-account/edit-account" : "/register",
    },
  ];

  return (
    <div className="w-full bg-[#284980] text-white py-1">
      <button
        className={`flex justify-between items-center w-full ${
          isRTL ? "pr-4 pl-4" : "pl-4 pr-4"
        } py-3 text-lg font-semibold`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {t("quick_find")} {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2"
        >
          {/* Categories Section */}
          <div>
            <div className="w-full opacity-[8%] h-[2px] rounded bg-white" />
            <button
              className={`flex justify-between items-center w-full ${
                isRTL ? "pr-4 pl-4" : "pl-4 pr-4"
              } py-3 text-[14px] font-semibold`}
              onClick={() => toggleSection("categories")}
            >
              {t("categories")}{" "}
              {openSections["categories"] ? <ChevronUp /> : <ChevronDown />}
            </button>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={
                openSections["categories"]
                  ? { opacity: 1, height: "auto" }
                  : { opacity: 0, height: 0 }
              }
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="mt-2 space-y-1">
                {(Allcategories || []).map((category, index) => (
                  <div key={index}>
                    <div className="w-full opacity-[8%] h-[2px] rounded bg-white" />
                    <Link
                      to={`/product-category/${category.name}`}
                      onClick={() => closeDrawerRight()}
                    >
                      <li
                        className={`p-2 ${
                          isRTL ? "pr-4" : "pl-4"
                        } bg-[#284980] rounded-md flex items-center`}
                      >
                        <LinkIcon
                          className={`w-4 h-4 ${isRTL ? "ml-1" : "mr-1"}`}
                        />
                        <span>
                          {isRTL ? category.arabicName : category.name}
                        </span>
                      </li>
                    </Link>
                  </div>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Quick Access Section */}
          <div>
            <div className="w-full opacity-[8%] h-[2px] rounded bg-white" />
            <button
              className={`flex justify-between items-center w-full ${
                isRTL ? "pr-4 pl-4" : "pl-4 pr-4"
              } py-3 text-[14px] font-semibold`}
              onClick={() => toggleSection("quick_access")}
            >
              {t("quick_access")}{" "}
              {openSections["quick_access"] ? <ChevronUp /> : <ChevronDown />}
            </button>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={
                openSections["quick_access"]
                  ? { opacity: 1, height: "auto" }
                  : { opacity: 0, height: 0 }
              }
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="mt-2 space-y-1">
                {quickAccessLinks.map((link, index) => (
                  <div key={index}>
                    <div className="w-full opacity-[8%] h-[2px] rounded bg-white" />
                    <Link to={link.to} onClick={() => closeDrawerRight()}>
                      <li
                        className={`p-2 ${
                          isRTL ? "pr-4" : "pl-4"
                        } bg-[#284980] rounded-md flex items-center`}
                      >
                        <LinkIcon
                          className={`w-4 h-4 ${isRTL ? "ml-1" : "mr-1"}`}
                        />
                        {link.label}
                      </li>
                    </Link>
                  </div>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuickFindDrawer;
