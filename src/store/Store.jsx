import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./reducers/AuthSlice.jsx";
import cartReducer from "./reducers/CartSlice.jsx";
import categoryReducer from "./reducers/CategorySlice.jsx";
import productReducer from "./reducers/ProductSlice.jsx";
import errorReducer from "./reducers/ErrorSlice.jsx";
import themeReducer from "./reducers/ThemeSlice.jsx";
import sellerReducer from "./reducers/SellerSlice.jsx";
import reviewReducer from "./reducers/reviewSlice.jsx";

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

const saveState = (state) => {
  try {
    const partialState = {
      auth: {
        username: state.auth.username,
        profile: state.auth.profile,
        token: state.auth.token,
      },
      cart: state.cart,
      theme: state.theme,
      product: state.product,
      seller: state.seller.store,
    };
    const serializedState = JSON.stringify(partialState);
    localStorage.setItem("app_state", serializedState);
  } catch (err) {
    console.warn("Failed to save sate: ", err);
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