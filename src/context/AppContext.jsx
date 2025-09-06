import React, { createContext, useContext, useMemo } from "react";
import { useSelector } from "react-redux";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
}