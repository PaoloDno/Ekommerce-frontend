import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./reducers/AuthSlice.jsx";
import cartReducer from "./reducers/CartSlice.jsx";
import categoryReducer from "./reducers/CategorySlice.jsx";
import productReducer from "./reducers/ProductSlice.jsx";
import errorReducer from "./reducers/ErrorSlice.jsx";
import themeReducer from "./reducers/ThemeSlice.jsx";
import sellerReducer from "./reducers/SellerSlice.jsx";

const store = configureStore({
  reducer: {
    error: errorReducer,
    theme: themeReducer,
    auth: authReducer,
    cart: cartReducer,
    category: categoryReducer,
    product: productReducer,
    seller: sellerReducer,
  },
});

export default store;