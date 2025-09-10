import { createContext, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const user = useSelector((state) => state.auth?.user || null);
  const totalQuantity = useSelector((state) => state.cart?.totalQuantity || 0);

  const value = useMemo(
    () => ({
      username: user,
      cartQuantity: totalQuantity,
    }),
    [user, totalQuantity]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);