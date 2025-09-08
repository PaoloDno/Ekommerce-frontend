// ThemeContext.jsx
import React, { createContext, useContext, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextTheme, setTheme } from "../store/reducers/ThemeSlice";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const dispatch = useDispatch();

  // Helpers
  const toggleTheme = useCallback(() => dispatch(nextTheme()), [dispatch]);
  const changeTheme = useCallback((theme) => dispatch(setTheme(theme)), [dispatch]);

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, changeTheme }}>
      <div className={`theme-${currentTheme} font-Merriweather bg-skin-color-back`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
