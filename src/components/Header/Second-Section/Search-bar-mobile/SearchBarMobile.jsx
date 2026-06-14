import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { getAllProducts } from "../../../../reduxSystem/slices/getAllProductsSlice";

const SearchBarMobile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Allproducts } = useSelector((state) => state.allProductsState);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const debouncedSearch = debounce((query) => {
    if (query?.length >= 2) {
      dispatch(
        getAllProducts({
          category: "", // دايمًا فاضي لأننا مش بنفلتر بكاتيجوري هنا
          search: query,
        })
      );
    }
  }, 500);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value?.length < 2) {
      setError(true);
      setShowResults(false);
      setNotFound(false);
      return;
    }

    setError(false);
    debouncedSearch(value);
    setShowResults(true);
  };

  const handleSubmit = () => {
    if (searchQuery?.length >= 2) {
      navigate(`/search-results?category=&query=${searchQuery}`);
      setSearchQuery("");
      setShowResults(false);
      setNotFound(false);
      setTimeout(() => {
        setSearchQuery("");
        setShowResults(false);
        setSearchResults([]);
        setNotFound(false);
        setError(false);
      }, 1000);
    } else {
      setError(true);
      setShowResults(false);
      setNotFound(false);
    }
  };

  useEffect(() => {
    if (Allproducts?.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
      setSearchResults(Allproducts);
    }
  }, [Allproducts]);

  const handleBlur = () => {
    if (searchQuery?.length < 2) {
      setError(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative px-4 w-full">
      <div className="relative flex items-center bg-white shadow-md rounded-full w-full max-w-md">
        <input
          type="text"
          placeholder={
            error ? "Enter at least 2 characters" : t("search_in_products")
          }
          className={`flex-grow px-4 py-2 text-gray-700 bg-transparent outline-none rounded-l-full ${
            error ? "text-red-500 placeholder-red-500" : ""
          }`}
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => {
            searchQuery?.length < 2 ? setError(true) : setError(false);
          }}
          onBlur={handleBlur}
        />

        <button
          onClick={handleSubmit}
          className="p-3 bg-yellow-500 rounded-full text-black hover:bg-yellow-600 transition"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {showResults && (
        <div className="absolute top-16 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {notFound ? (
            <div className="p-4 text-center text-gray-500">
              {t("no_products_found")}
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
              {searchResults.map((product) => (
                <Link
                  key={product?._id}
                  to={`/productdetails/${product?._id}`}
                  onClick={() => {
                    setSearchQuery("");
                    setShowResults(false);
                    setNotFound(false);
                  }}
                >
                  <li className="px-4 py-2 flex items-center gap-3 hover:bg-gray-100 cursor-pointer">
                    {product?.thumbnail && (
                      <img
                        src={product.thumbnail}
                        alt={product.title || "Product"}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    )}
                    <span className="text-gray-700">
                      {product.title || "Unknown Product"}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBarMobile;
