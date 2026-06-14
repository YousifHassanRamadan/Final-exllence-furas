import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../../../reduxSystem/slices/getAllCategorySlice";
import { useTranslation } from "react-i18next";

const BrowseCollectionDrawer = ({ closeDrawerRight }) => {
  const { isRTL } = useSelector((state) => state.RTLState);

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { Allcategories, categoryLoading, error } = useSelector(
    (state) => state.getCategoryState
  );

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <div className="w-full bg-[#284980] text-white">
      {/* Clickable Header */}
      <button
        className={`flex justify-between items-center w-full ${
          isRTL ? "px-4" : "px-4"
        } py-3 text-lg font-semibold`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isRTL ? "تصفح المجموعة" : "Browse Collection"}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {/* Animated Collapsible Section */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={
          isOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }
        }
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <ul className="mt-2 space-y-1">
          {(Allcategories || []).map((category, index) => (
            <li
              key={index}
              className={`flex ${
                isRTL ? "justify-start" : "justify-between"
              } items-center gap-2 ${
                isRTL ? "px-4" : "px-4"
              } py-2 border-t border-white/20 w-full`}
            >
              <Link
                to={`/product-category/${category.name.toLowerCase()}`}
                className={`flex items-center`}
                onClick={() => closeDrawerRight()}
              >
                <LinkIcon className={`w-4 h-4 ${isRTL ? "ml-1" : "mr-1"}`} />
                <span>{isRTL ? category.arabicName : category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default BrowseCollectionDrawer;
