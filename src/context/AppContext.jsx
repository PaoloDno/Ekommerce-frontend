import React, { createContext, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Pull all Redux state you need ONCE
  const { username } = useSelector((state) => ({
    username: state.auth?.user?.username || null,
  }));
  const { totalQuantity } = useSelector((state) => ({
    totalQuantity: state.cart?.totalQuantity || 0,
  }));
  const { currentTheme } = useSelector((state) => ({
    currentTheme: state.theme?.currentTheme || 'default',
  }));

  // Memoize so children only re-render if these values change
  const value = useMemo(
    () => ({
      username,
      cartQuantity: totalQuantity,
      theme: currentTheme,
    }),
    [username, totalQuantity, currentTheme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
