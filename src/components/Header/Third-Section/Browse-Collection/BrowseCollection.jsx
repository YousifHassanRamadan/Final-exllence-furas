import { useEffect, useState } from "react";
import { Menu, MenuHandler, MenuList, Button } from "@material-tailwind/react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, replace } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../../../reduxSystem/slices/getAllCategorySlice";

const BrowseCollection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isRTL } = useSelector((state) => state.RTLState);

  const [openMenu, setOpenMenu] = useState(false);

  const dispatch = useDispatch();

  const { Allcategories, categoryLoading, error } = useSelector(
    (state) => state.getCategoryState
  );

  // console.log("Allcategories", Allcategories);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <div className="bg-white">
      <Menu>
        <MenuHandler>
          <Button
            className={`text-[#284980] border-none h-full bg-white shadow-none hover:shadow-none flex items-center duration-300 hover:text-[#F8C530] ${
              isRTL && "flex-row-reverse"
            }`}
          >
            <span className=" text-[14px] font-semibold">
              {t("browse_collection")}
            </span>{" "}
            <ChevronDownIcon strokeWidth={1.5} className={`h-3.5 w-3.5 ml-1`} />
          </Button>
        </MenuHandler>
        <MenuList className="flex flex-col w-[210px] border-none bg-white  rounded-lg overflow-hidden z-[1000]">
          {(Allcategories || []).map((category, index) => (
            <div
              key={index}
              className="px-5 py-1 hover:outline-none hover:outline-white"
            >
              <div
                onClick={() =>
                  navigate(`/product-category/${category.name.toLowerCase()}`, {
                    replace: true,
                  })
                }
                className={`flex items-center justify-center py-2 hover:text-[#2b7fff] text-[#5E77A0]  transition-all duration-300 `}
              >
                {isRTL ? category.arabicName : category.name}
              </div>
            </div>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default BrowseCollection;
