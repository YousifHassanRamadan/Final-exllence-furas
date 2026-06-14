import { Container } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { getOfferProducts } from "../reduxSystem/slices/getProductWithOffersSLice";
import ProductCard from "../components/Ui-Card/ProductCard";
import { useNavigate } from "react-router-dom";

const BestSalesPage = () => {
  const { t } = useTranslation();
  const { offerProducts, loading } = useSelector(
    (state) => state.offerProductsState
  );

  // console.log("offerProducts", offerProducts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOfferProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Container maxWidth="xl" className="w-full py-16 px-4">
        <div className="text-center mb-16 relative">
          {/* Badge */}
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide uppercase shadow-lg">
              🔥 Hot Deals
            </span>
          </div>

          {/* Main heading with gradient text */}
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-700 bg-clip-text text-transparent leading-tight mb-6">
            {t("bestSellingProducts")}
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
            {t("exploreOurHotAndSpringSales")}
          </p>

          {/* Decorative line */}
          <div className="flex justify-center mt-8">
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          </div>
        </div>

        {/* Products Section */}
        <div className="relative">
          {loading ? (
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-all duration-300">
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width="100%"
                      height={220}
                      className="rounded-xl mb-4"
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width="80%"
                      height={24}
                      className="mb-2"
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width="60%"
                      height={20}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : offerProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                {/* Empty state illustration */}
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                  No Offers Available
                </h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  We're working on bringing you amazing deals. Check back soon
                  for exciting offers!
                </p>

                <button
                  onClick={() => navigate("/")}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Home
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Products count badge */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                  <span className="bg-white px-4 py-2 rounded-full shadow-md text-gray-600 font-medium">
                    {offerProducts.length} Products Found
                  </span>
                  <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
                  <span className="hidden sm:inline-block text-green-600 font-medium">
                    ✨ Special Offers Available
                  </span>
                </div>
              </div>

              {/* Products grid */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-9">
                {offerProducts.map((prod, index) => (
                  <div key={prod.id} className="group animate-fade-in-up">
                    <ProductCard product={prod} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default BestSalesPage;
