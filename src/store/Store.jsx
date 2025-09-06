import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./reducers/AuthSlice.jsx";
import cartReducer from "./reducers/CartSlice.jsx";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;