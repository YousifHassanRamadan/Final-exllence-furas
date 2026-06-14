import { useState } from "react";
import { Menu, MenuHandler, MenuList, Button } from "@material-tailwind/react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const QuickFind = () => {
  const { t } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);

  const { isRTL } = useSelector((state) => state.RTLState);

  const { Allcategories, categoryLoading, error } = useSelector(
    (state) => state.getCategoryState
  );

  const { isLogged } = useSelector((state) => state.authState);

  const quickFind = [
    {
      name: t("quick_access"),
      items: [t("my_account"), t("orders"), t("lost_password"), t("addresses")],
    },
  ];

  return (
    <div>
      <Menu>
        <MenuHandler>
          <Button
            className={`text-white border-none h-full bg-[#284980] shadow-none hover:shadow-none flex items-center duration-300 hover:text-[#F8C530] ${
              isRTL && "flex-row-reverse"
            }`}
          >
            <span className=" text-[14px] font-semibold ">
              {t("quick_find")}
            </span>
            <ChevronDownIcon strokeWidth={1.5} className="h-3.5 w-3.5 ml-1" />
          </Button>
        </MenuHandler>
        <MenuList className="flex flex-col md:flex-row justify-between gap-[5rem] sm:-ml-9 border-none bg-white shadow-lg rounded-lg overflow-hidden z-[1000] w-[450px]">
          {/* عرض Allcategories إن وجدت */}

          {!categoryLoading && Allcategories?.length > 0 && (
            <div className="px-5 hover:outline-none hover:outline-white">
              <h3 className="cursor-pointer text-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:ml-2 text-[#284980]">
                {t("categories")}
              </h3>
              <ul className="mt-2 space-y-1">
                {Allcategories.map((category, i) => (
                  <li
                    key={i}
                    className={`flex items-center my-2 gap-1 text-gray-600 hover:text-blue-500 cursor-pointer transition-all duration-300 ${
                      isRTL ? "hover:mr-2" : "hover:ml-2"
                    } `}
                  >
                    <Link
                      to={`/product-category/${category.name}`}
                      className="flex items-center justify-center"
                    >
                      {isRTL ? category.arabicName : category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* عرض القائمة الثابتة */}
          {quickFind.map((link, index) => (
            <div
              key={index}
              className="px-5 hover:outline-none hover:outline-white"
            >
              <h3 className="cursor-pointer text-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:ml-2 text-[#284980]">
                {link.name}
              </h3>
              <ul className="mt-2 space-y-1">
                {link.items.map((item, i) =>
                  item === t("my_account") && isLogged ? (
                    <li
                      key={i}
                      className={`flex items-center my-2 gap-1 text-gray-600 hover:text-blue-500 cursor-pointer transition-all duration-300 ${
                        isRTL ? "hover:mr-2" : "hover:ml-2"
                      } `}
                    >
                      <Link
                        to={`/my-account`}
                        className="flex items-center justify-center"
                      >
                        {item}
                      </Link>
                    </li>
                  ) : item === t("my_account") && isLogged === false ? (
                    <li
                      key={i}
                      className={`flex items-center my-2 gap-1 text-gray-600 hover:text-blue-500 cursor-pointer transition-all duration-300 ${
                        isRTL ? "hover:mr-2" : "hover:ml-2"
                      } `}
                    >
                      <Link
                        to={`/register`}
                        className="flex items-center justify-center"
                      >
                        {t("register")}
                      </Link>
                    </li>
                  ) : item === t("orders") && isLogged ? (
                    <li
                      key={i}
                      className={`flex items-center my-2 gap-1 text-gray-600 hover:text-blue-500 cursor-pointer transition-all duration-300 ${
                        isRTL ? "hover:mr-2" : "hover:ml-2"
                      } `}
                    >
                      <Link
                        to={isLogged ? `/my-account/orders` : `/register`}
                        className="flex items-center justify-center"
                      >
                        {item}
                      </Link>
                    </li>
                  ) : item === t("lost_password") && isLogged ? (
                    <li
                      key={i}
                      className={`flex items-center my-2 gap-1 text-gray-600 hover:text-blue-500 cursor-pointer transition-all duration-300 ${
                        isRTL ? "hover:mr-2" : "hover:ml-2"
                      } `}
                    >
                      <Link
                        to={isLogged ? `/my-account/edit-account` : `/register`}
                        className="flex items-center justify-center"
                      >
                        {item}
                      </Link>
                    </li>
                  ) : (
                    <li
                      key={i}
                      className={`flex items-center my-2 gap-1 text-gray-600 hover:text-blue-500 cursor-pointer transition-all duration-300 ${
                        isRTL ? "hover:mr-2" : "hover:ml-2"
                      } `}
                    >
                      <Link
                        to={isLogged ? `/my-account/edit-address` : `/register`}
                        className="flex items-center justify-center"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default QuickFind;
