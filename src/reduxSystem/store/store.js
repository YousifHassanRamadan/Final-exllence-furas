import { configureStore } from "@reduxjs/toolkit";
import { RTLState } from "../slices/handleRTLSlice";
import { authState } from "../slices/authSlice";
import { addProductState } from "../slices/addProductSlice";
import { allProductsState } from "../slices/getAllProductsSlice";
import { adminProductsState } from "../slices/adminProductsSlice";
import { editProductState } from "../slices/editProductSlice";
import { addCategoryState } from "../slices/addCategorySlice";
import { getCategoryState } from "../slices/getAllCategorySlice";
import { deleteAdminProductsState } from "../slices/deleteProductSlice";
import { AdminAddProductState } from "../slices/admidAddProdSlice";
import { deleteCategoryState } from "../slices/deleteCategorySlice";
import { editCategoryState } from "../slices/editCategorySlice";
import { cartState } from "../slices/addToCartSlice";
import { backEndAddToCartState } from "../slices/backEndAddToCartSlice";
import { favouriteState } from "../slices/favouriteSlice";
import { getFavouritestate } from "../slices/getFavouriteSlice";
import { userSliceState } from "../slices/editProfileSlice";
import { changePasswordState } from "../slices/editPasswordSlice";
import { userAddressState } from "../slices/getUserAddressSlice";
import { editAddressState } from "../slices/editAddressSlice";
import { AddToCartState } from "../slices/backAddToCartSlice";
import { getCartState } from "../slices/getUserCartSlice";
import { deleteProdCart } from "../slices/deleteCartProdSlice";
import { editCartState } from "../slices/updataCartSlice";
import { deleteAddressState } from "../slices/deleteAddressUserSlice";
import { singleProductState } from "../slices/getSingleProdSlice";
import { addRevState } from "../slices/addReviewSLice";
import { deleteReviewState } from "../slices/deleteReviewSlice";
import { reviewState } from "../slices/editReviewSlice";
import { placeOrderState } from "../slices/addPlaceOrderSlice";
import { ordersUserState } from "../slices/getUserOrderSlice";
import { clearCartState } from "../slices/clearUserCartSlice";
import { getAllUsersState } from "../slices/getAllUsersSlice";
import { setAdminState } from "../slices/editRoleUsersSlice";
import { removeAdminState } from "../slices/removeAdminSlice";
import { deleteUserState } from "../slices/deleteUserSlice";
import { banUserState } from "../slices/banUserSlice";
import { dashboardStatsState } from "../slices/getDashboardStatusSlice";
import { salesReportState } from "../slices/getSalesReportSlice";
import { variantState } from "../slices/addVariantSlice";
import { discountState } from "../slices/addOfferSlice";
import { getProdVariantState } from "../slices/getEditProductVariantSLice";
import { editProdVariantState } from "../slices/editVariantProductSlice";
import { deleteProdVariantState } from "../slices/deleteProductVariantSlice";
import { editOfferState } from "../slices/editOfferProductSlice";
import { deleteOfferState } from "../slices/deleteOfferSlice";
import { allOrdersState } from "../slices/getAllOrdersSlice";
import { editOrderStatusState } from "../slices/editOrderStatusSlice";
import { relatedProductsState } from "../slices/getRelatedProductSlice";
import { priceFilterState } from "../slices/priceFilter";
import { sortState } from "../slices/sortProductSlice";
import { compareProductState } from "../slices/compareProductSlice";
import { verifyAccountState } from "../slices/verifyAccountSlice";
import { refreshTokenState } from "../slices/refreshTokenSlice";
import { addAddressState } from "../slices/addAddressSlice";
import { offerProductsState } from "../slices/getProductWithOffersSLice";
import { allSwiperProductsState } from "../slices/getSwiperProductSlice";

const store = configureStore({
  reducer: {
    RTLState,
    authState,
    addProductState,
    allProductsState,
    adminProductsState,
    editProductState,
    addCategoryState,
    getCategoryState,
    deleteAdminProductsState,
    AdminAddProductState,
    deleteCategoryState,
    editCategoryState,
    cartState,
    backEndAddToCartState,
    favouriteState,
    getFavouritestate,
    userSliceState,
    changePasswordState,
    userAddressState,
    editAddressState,
    AddToCartState,
    getCartState,
    deleteProdCart,
    editCartState,
    deleteAddressState,
    addAddressState,
    singleProductState,
    addRevState,
    deleteReviewState,
    reviewState,
    placeOrderState,
    ordersUserState,
    clearCartState,
    getAllUsersState,
    setAdminState,
    removeAdminState,
    deleteUserState,
    banUserState,
    dashboardStatsState,
    salesReportState,
    variantState,
    discountState,
    getProdVariantState,
    editProdVariantState,
    deleteProdVariantState,
    editOfferState,
    deleteOfferState,
    allOrdersState,
    editOrderStatusState,
    relatedProductsState,
    priceFilterState,
    sortState,
    compareProductState,
    verifyAccountState,
    refreshTokenState,
    offerProductsState,
    allSwiperProductsState,
  },
});

export default store;
