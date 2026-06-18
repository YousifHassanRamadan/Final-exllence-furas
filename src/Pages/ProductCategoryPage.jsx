import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import FilterProductCategory from "../components/FilterProductCategory/FilterProductCategory";
import ProductCategory from "../components/ProductCategory/ProductCategory";
import ProductCard from "../components/Ui-Card/ProductCard";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../reduxSystem/slices/getAllProductsSlice";
import Skeleton from "@mui/material/Skeleton";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { setSortBy } from "../reduxSystem/slices/sortProductSlice";
import { ChevronDown } from "lucide-react";
import { handelRTL } from "../reduxSystem/slices/handleRTLSlice";

const ITEMS_PER_PAGE = 10;

const ProductCategoryPage = () => {
  const { category } = useParams();

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const { Allproducts, loading, totalPages, totalProducts } = useSelector(
    (state) => state.allProductsState,
  );
  const { minPrice, maxPrice } = useSelector((state) => state.priceFilterState);

  const { sortBy } = useSelector((state) => state.sortState);

  const { t } = useTranslation();

  // restore saved sort/page on mount
  useEffect(() => {
    const savedSortBy = localStorage.getItem("sortBy");
    const savedPage = localStorage.getItem("currentPage");

    if (savedSortBy) {
      dispatch(setSortBy(savedSortBy));
    }

    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  // reset to page 1 whenever the category changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [category]);

  // real server-side pagination: page, limit, category all sent to the API
  useEffect(() => {
    dispatch(
      getAllProducts({
        category: category === "allproducts" ? "" : category,
        page: currentPage,
        limit: ITEMS_PER_PAGE,
      }),
    );
  }, [category, currentPage]);

  useEffect(() => {
    localStorage.setItem("sortBy", sortBy);
    localStorage.setItem("currentPage", currentPage);
  }, [sortBy, currentPage]);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  // the price filter / client sort now apply only to the current page of
  // products returned by the server (10 items), not the whole catalog
  const filteredProducts = Allproducts.filter(
    (prod) => prod.price >= minPrice && prod.price <= maxPrice,
  );

  const sortedProducts = useMemo(() => {
    let sortedArray = [...filteredProducts];

    if (sortBy === "price_asc") {
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      sortedArray.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      sortedArray.sort((a, b) => b.rating - a.rating);
    }

    return sortedArray;
  }, [filteredProducts, sortBy]);

  const { Allcategories } = useSelector((state) => state.getCategoryState);

  const filteredCategories = Allcategories.filter((cat) => {
    return cat.name.toLowerCase() === category.toLowerCase();
  });

  const { isRTL } = useSelector((state) => state.RTLState);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "en_US" ? "ltr" : "rtl";
    if (i18n.language === "ar_AE") {
      dispatch(handelRTL(true));
    } else {
      dispatch(handelRTL(false));
    }
  }, [i18n.language, isRTL]);

  const noProducts = !loading && totalProducts === 0;

  return (
    <Container
      maxWidth="xl"
      className="flex flex-col-reverse md:flex-row justify-between min-h-screen mt-9 mb-[10%] flex-wrap-reverse"
    >
      {/* *filterAndCategories */}
      <div className="filterAndCategories flex flex-col  lg:w-[20%] lg:my-0 my-[10%] w-[100%]">
        <FilterProductCategory />

        <div className="my-5"></div>

        <ProductCategory />

        <div className="my-5"></div>
      </div>

      {/**products */}
      <div className="products lg:w-[70%] w-[100%] md:w-[100%]">
        <div className="header">
          <div className="category flex flex-col justify-between">
            <p className="text-3xl text-[#424a63] font-semibold">
              {isRTL
                ? filteredCategories[0]?.arabicName
                : filteredCategories[0]?.name}
            </p>
            <p className="text-[#c8d0de] mt-2">
              {t("showing_results", { count: totalProducts })}
            </p>
          </div>

          <div className="relative w-full mt-9 ">
            <select
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:shadow-lg"
            >
              <option value="default">{t("default")}</option>
              <option value="price_asc">{t("price_low_high")}</option>
              <option value="price_desc">{t("price_high_low")}</option>
              <option value="rating">{t("top_rated")}</option>
            </select>
            <ChevronDown
              className={`absolute ${
                isRTL ? "left-3" : "right-3"
              } top-3  text-gray-500 pointer-events-none`}
              size={18}
            />
          </div>
        </div>

        {sortedProducts.length === 0 && !loading && (
          <p className="text-center text-gray-500 mt-5">{t("no_products")}</p>
        )}

        <div
          className="ourProducts flex flex-wrap gap-5 justify-center mt-10"
          style={{ minHeight: "90vh" }}
        >
          {loading
            ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width="100%"
                  height={250}
                />
              ))
            : sortedProducts.map((prod) => (
                <ProductCard product={prod} key={prod._id} />
              ))}
        </div>

        {/* pagination, driven entirely by server response */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={noProducts || currentPage === 1}
            className="px-4 py-2 mx-1 bg-[#284980] text-white rounded disabled:opacity-50 cursor-pointer"
          >
            {t("first")}
          </button>
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={noProducts || currentPage === 1}
            className="px-4 py-2 mx-1 bg-[#284980] text-white rounded disabled:opacity-50 cursor-pointer"
          >
            <FaArrowLeft />
          </button>
          <span className="px-4 py-2">
            {noProducts ? 0 : currentPage} / {noProducts ? 0 : totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={noProducts || currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-[#284980] text-white rounded disabled:opacity-50 cursor-pointer"
          >
            <FaArrowRight />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={noProducts || currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-[#284980] text-white rounded disabled:opacity-50 cursor-pointer"
          >
            {totalPages}
          </button>
        </div>
      </div>
    </Container>
  );
};

export default ProductCategoryPage;
