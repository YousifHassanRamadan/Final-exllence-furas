import { createSlice } from "@reduxjs/toolkit";

// تحميل البيانات المحفوظة في localStorage
const loadFromLocalStorage = () => {
  const data = localStorage.getItem("compareProducts");
  return data ? JSON.parse(data) : [];
};

// حفظ البيانات في localStorage
const saveToLocalStorage = (state) => {
  localStorage.setItem("compareProducts", JSON.stringify(state));
};

const compareProductSlice = createSlice({
  name: "compare",
  initialState: {
    compareProducts: loadFromLocalStorage(),
  },
  reducers: {
    addToCompare: (state, action) => {
      const product = action.payload;
      const exists = state.compareProducts.find((p) => p._id === product._id);

      if (!exists) {
        state.compareProducts.push(product);
        saveToLocalStorage(state.compareProducts);
      }
    },
    removeFromCompare: (state, action) => {
      state.compareProducts = state.compareProducts.filter(
        (p) => p._id !== action.payload
      );
      saveToLocalStorage(state.compareProducts);
    },
    loadCompareFromStorage: (state) => {
      state.compareProducts = loadFromLocalStorage();
    },
  },
});

export const { addToCompare, removeFromCompare, loadCompareFromStorage } =
  compareProductSlice.actions;

export const compareProductState = compareProductSlice.reducer;
