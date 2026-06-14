//-----------------------api constants ---------------------
export const BASE_URLS = {
  DEV: "http://localhost:3000/",
  PROD: "https://e-commerce-backend-lplm.onrender.com/",
};

const ADMIN_ENPOINTS = {
  GET_ALL_USERS: "admin/all-users",
  GET_ALL_ORDERS: "admin/orders",
  GET_DASHBOARD_STATUS: "admin/dashboard-stats",
  GET_EDIT_PRODUCT_VARIANT: "admin/get-edit-variant/",
  GET_SALES_REPORT: "admin/sales-report",
  GET_ADMIN_PRODUCTS: "admin/products",
  ADD_CATEGORY: "admin/add-category",
  ADD_OFFER: "admin/create-offer",
  ADD_PRODUCT: "admin/add-product",
  ADD_VARIANT: "admin/add-variant",
  ADD_ADMIN: "admin/set-admin",
  EDIT_BAN_USER: "admin/ban-user",
  EDIT_CATEGOTRY: "admin/categories/update",
  EDIT_OFFER: "admin/edit-offer",
  EDIT_ORDER_STATUS: "admin/orders/update-status",
  EDIT_PRODUCT: "admin/products/edit-product",
  EDIT_VARIANT: "admin/edit-variant",
  DELETE_CATEGORY: "admin/categories/delete",
  DELETE_OFFER: "admin/delete-offer",
  DELETE_PRODUCT: "admin/products/delete",
  DELETE_PRODUCT_VARIANT: "admin/delete-product-variant",
  DELETE_USER: "admin/delete-user",
  REMOVE_ADMIN: "admin/remove-admin",
};
const SELLER_ENDPOINTS = {
  LOGIN: "",
};
const CUSTOMER_ENDPOINTS = {
  LOGIN: "user/auth/login",
  SIGNUP: "user/auth/signup",
  REFRESH_TOKEN: "user/get-refresh-token",
  GET_USER_DATA: "user/data",
  GET_CATEGORIES_LIST: "products/categories/list",
  GET_PRODUCTS: "products",
  GET_FAVOURITES: "user/favorites",
  GET_RELATED_PRODUCTS: "products/related-products/list",
  GET_SINGLE_PRODUCT: "products/",
  GET_USER_ADDRESSES: "user/addresses",
  GET_USER_CART: "user/cart",
  GET_USER_ORDERS: "user/orders",
  EDIT_CART_ITEM: "user/cart/update-cart",
  ADD_USER_ADDRESS: "user/add-address",
  ADD_PLACE_ORDER: "user/place-order",
  ADD_REVIEW: "user/add-review",
  ADD_DELETE_FAVOURITE: "user/favorites/toggle",
  ADD_TO_CART: "user/cart/add-to-cart",
  EDIT_ADDRESS: "user/update-address",
  EDIT_PASSWORD: "user/update-password",
  EDIT_PROFILE: "user/update-profile",
  EDIT_REVIEW: "user/update-review",
  DELETE_USER_CART: "user/cart/clear-cart",
  DELETE_USER_ADDRESS: "user/delete-address",
  DELETE_ITEM_CART: "user/cart/delete-item",
  DELETE_REVIEW: "user/delete-review",
  VERIFY_ACCOUNT: "user/request-email-verification",
  PRODUCTS_WITH_OFFER: "products/with-offer/list",
};
export const API_ENDPOINTS = {
  ADMIN_ENPOINTS: ADMIN_ENPOINTS,
  SELLER_ENDPOINTS: SELLER_ENDPOINTS,
  CUSTOMER_ENDPOINTS: CUSTOMER_ENDPOINTS,
};

//-----------------------------local storage constants --------------------

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: "@ACCESS_TOKEN",
  REFRESH_TOKEN: "@REFRESH_TOKEN",
};
