import { createContext, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const username = useSelector((state) => state.auth?.username || null);
  const totalItems = useSelector((state) => state.auth?.totalItems || 0);

  const value = useMemo(
    () => ({
      username: username,
      totalItems: totalItems,
    }),
    [username, totalItems]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);