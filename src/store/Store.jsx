import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./reducers/AuthSlice.jsx";
import cartReducer from "./reducers/CartSlice.jsx";
import categoryReducer from "./reducers/CategorySlice.jsx";
import productReducer from "./reducers/ProductSlice.jsx";
import errorReducer from "./reducers/ErrorSlice.jsx";
import themeReducer from "./reducers/ThemeSlice.jsx";
import sellerReducer from "./reducers/SellerSlice.jsx";
import reviewReducer from "./reducers/reviewSlice.jsx";
import orderReducer from "./reducers/OrderSlice.jsx";
import notifReducer from "./reducers/NotifSlice.jsx";


const loadState = () => {
  try {
    const serializedState = localStorage.getItem("app_state");
    if (serializedState == null) return undefined;
    return JSON.parse(serializedState);
  } catch(error) {
    console.warn("Failed to load state:", err);
    return undefined;
  }
};

const cleanSlice = (slice) => {
  const { isPending, isRejected, isSuccess, error, ...rest } = slice;
  return rest;
};

const saveState = (state) => {
  try {
    const partialState = {
      auth: cleanSlice(state.auth),
      cart: cleanSlice(state.cart),
      theme: state.theme,
      product: cleanSlice(state.product),
      seller: cleanSlice(state.seller),
    };

    localStorage.setItem("app_state", JSON.stringify(partialState));
  } catch (err) {
    console.warn("Failed to save state:", err);
  }
};

let saveTimeout;

const persistedState = loadState();

const store = configureStore({
  reducer: {
    error: errorReducer,
    theme: themeReducer,
    auth: authReducer,
    cart: cartReducer,
    category: categoryReducer,
    product: productReducer,
    seller: sellerReducer,
    review: reviewReducer,
    order: orderReducer,
    notif: notifReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveState(store.getState());
  }, 2000);
});

export default store;