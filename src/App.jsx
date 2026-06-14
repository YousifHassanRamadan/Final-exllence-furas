import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Loader from "./components/loader/Loader";
import {
  ProtectedRoute,
  AdminProtectedRoute,
  SuperAdminProtectedRoute,
} from "./components/ProtectedRoute/ProtectedRoute";

const RootPage = lazy(() => import("./Pages/RootPage"));
const HomePage = lazy(() => import("./Pages/HomePage"));
const AboutPage = lazy(() => import("./Pages/AboutPage"));
const ProductCategoryPage = lazy(() => import("./Pages/ProductCategoryPage"));
const BrandsPage = lazy(() => import("./Pages/BrandsPage"));
const BestSalesPage = lazy(() => import("./Pages/BestSalesPage"));
const ProductTagPage = lazy(() => import("./Pages/ProductTagPage"));
const BlogPage = lazy(() => import("./Pages/BlogPage"));
const FaqPage = lazy(() => import("./Pages/FaqPage"));
const AccountPage = lazy(() => import("./Pages/AccountPage"));
const OrdersPage = lazy(() => import("./Pages/OrdersPage"));
const WishlistPage = lazy(() => import("./Pages/WishlistPage"));
const EditAccountPage = lazy(() => import("./Pages/EditAccountPage"));
const EditAddressPage = lazy(() => import("./Pages/EditAddressPage"));
const ContactPage = lazy(() => import("./Pages/ContactPage"));
const ComparePage = lazy(() => import("./Pages/ComparePage"));
const MyWishListPage = lazy(() => import("./Pages/MyWishListPage"));
const AdminDashboard = lazy(() => import("./Pages/AdminDashboard"));
const LogInAndSignUp = lazy(() => import("./Pages/LogInAndSignUp"));
const CartPage = lazy(() => import("./Pages/CartPage"));
const PlaceOrder = lazy(() => import("./Pages/PlaceOrder"));
const ProductDetailsPage = lazy(() => import("./Pages/ProductDetailsPage"));
const SuperAdminPanel = lazy(() => import("./Pages/SuperAdminPanel"));
const SearchPage = lazy(() => import("./Pages/SearchPage"));
const AllOrdersPage = lazy(() => import("./Pages/AllOrdersPage"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage"));

// Common loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen w-full">
    <div className="flex flex-col justify-center"></div>
    <Loader />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/" replace />,
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <RootPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LogInAndSignUp />
          </Suspense>
        ),
      },
      {
        path: "brands",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <BrandsPage />
          </Suspense>
        ),
      },
      {
        path: "best-sales",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <BestSalesPage />
          </Suspense>
        ),
      },
      {
        path: "blog",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <BlogPage />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: "faq",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <FaqPage />
          </Suspense>
        ),
      },
      {
        path: "compare",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ComparePage />
          </Suspense>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ProductDetailsPage />
          </Suspense>
        ),
      },
      {
        path: "search-results",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: "product-category/:category",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ProductCategoryPage />
          </Suspense>
        ),
      },
      {
        path: "product-tag/:tag",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ProductTagPage />
          </Suspense>
        ),
      },

      // Protected routes that require authentication
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "placeorder",
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <PlaceOrder />
              </Suspense>
            ),
          },
          {
            path: "wishlist",
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <WishlistPage />
              </Suspense>
            ),
          },
          {
            path: "cart",
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <CartPage />
              </Suspense>
            ),
          },
          {
            path: "my-account",
            element: (
              <Suspense fallback={<LoadingFallback />}>
                <AccountPage />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<LoadingFallback />}>
                    <OrdersPage />
                  </Suspense>
                ),
              },
              {
                path: "orders",
                element: (
                  <Suspense fallback={<LoadingFallback />}>
                    <OrdersPage />
                  </Suspense>
                ),
              },
              {
                path: "mywishlist",
                element: (
                  <Suspense fallback={<LoadingFallback />}>
                    <MyWishListPage />
                  </Suspense>
                ),
              },
              {
                path: "edit-address",
                element: (
                  <Suspense fallback={<LoadingFallback />}>
                    <EditAddressPage />
                  </Suspense>
                ),
              },
              {
                path: "edit-account",
                element: (
                  <Suspense fallback={<LoadingFallback />}>
                    <EditAccountPage />
                  </Suspense>
                ),
              },

              // Admin-only routes
              {
                element: <AdminProtectedRoute />,
                children: [
                  {
                    path: "admin-dashboard",
                    element: (
                      <Suspense fallback={<LoadingFallback />}>
                        <AdminDashboard />
                      </Suspense>
                    ),
                  },
                  {
                    path: "all-orders",
                    element: (
                      <Suspense fallback={<LoadingFallback />}>
                        <AllOrdersPage />
                      </Suspense>
                    ),
                  },

                  // SuperAdmin-only routes
                  {
                    element: <SuperAdminProtectedRoute />,
                    children: [
                      {
                        path: "manageuser",
                        element: (
                          <Suspense fallback={<LoadingFallback />}>
                            <SuperAdminPanel />
                          </Suspense>
                        ),
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/*",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ErrorPage />
      </Suspense>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
