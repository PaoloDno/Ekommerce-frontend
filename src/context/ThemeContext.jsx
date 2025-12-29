import React, { createContext, useContext, useCallback, useDebugValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextTheme, setTheme } from "../store/reducers/ThemeSlice";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState('default');

  useEffect(() => {
    setCurrent(currentTheme);
  }, [currentTheme])
  // Helpers
  const toggleTheme = useCallback(() => dispatch(nextTheme()), [dispatch]);
  const changeTheme = useCallback((theme) => 
    {
      dispatch(setTheme(theme))
    }, [dispatch]);

  return (
    <ThemeContext.Provider value={{ current, toggleTheme, changeTheme }}>
      <div className={`theme-${current} font-sans transition-colors duration-450 ease-in-out`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
