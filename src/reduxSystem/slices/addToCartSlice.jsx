import { createSlice } from "@reduxjs/toolkit";
import { addToCartBack } from "./backEndAddToCartSlice";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [], // 🔹 تحميل السلة من التخزين المحلي
  totalPrice: 0,
  totalQuantity: 0,
  cartSize: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ إضافة منتج إلى السلة
    addToCart: (state, action) => {
      if (!state.cartItems) state.cartItems = [];

      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
        state.totalQuantity++;
      } else {
        // ✅ التحقق مما إذا كانت quantity موجودة في الـ payload
        const tempProduct = {
          ...action.payload,
          quantity: action.payload.hasOwnProperty("quantity")
            ? action.payload.quantity
            : 1,
        };

        state.cartItems.push(tempProduct);
        state.totalQuantity += tempProduct.quantity;
        state.cartSize++;
      }

      state.totalPrice += action.payload.price;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // ✅ زيادة الكمية
    increment: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );

      if (itemIndex >= 0) {
        // ✅ التأكد من أن `quantity` موجودة
        if (!state.cartItems[itemIndex].hasOwnProperty("quantity")) {
          state.cartItems[itemIndex].quantity = 1;
        } else {
          state.cartItems[itemIndex].quantity += 1;
        }

        state.totalQuantity += 1;
        state.totalPrice += state.cartItems[itemIndex].price;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    // ✅ تقليل الكمية
    decrement: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );

      if (itemIndex >= 0) {
        if (!state.cartItems[itemIndex].hasOwnProperty("quantity")) {
          state.cartItems[itemIndex].quantity = 1;
        }

        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity -= 1;
          state.totalQuantity -= 1;
          state.totalPrice -= state.cartItems[itemIndex].price;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item._id !== action.payload
          );
        }

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    // ✅ إزالة منتج من السلة
    removeFromCart: (state, action) => {
      if (!state.cartItems) state.cartItems = [];

      const item = state.cartItems.find((item) => item._id === action.payload);
      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload
        );
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    // ✅ إعادة تعيين السلة
    resetCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
      state.cartSize = 0;
      localStorage.removeItem("cartItems");
    },

    // ✅ تحديث السلة عند تحميل البيانات
    setCart: (state, action) => {
      state.cartItems = action.payload || [];
    },
  },
});

export const {
  addToCart,
  increment,
  decrement,
  removeFromCart,
  resetCart,
  setCart,
} = cartSlice.actions;

export const cartState = cartSlice.reducer;
