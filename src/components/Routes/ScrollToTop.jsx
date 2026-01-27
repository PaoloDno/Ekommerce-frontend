import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useSelector } from "react-redux";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const { changeTheme } = useTheme();
  const { profile } = useSelector((s) => s.auth);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    if(profile?.userTheme) {
      console.log("CHANGE TEHEME:" , profile?.userTheme);
      changeTheme(profile?.userTheme);
    };

  }, [pathname]);

  return null;
};

export default ScrollToTop;