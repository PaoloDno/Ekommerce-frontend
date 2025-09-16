import React, { useEffect } from "react";
import { FaPalette } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { themeToggleAction } from "../../store/actions/AuthThunks";
import { useDispatch } from "react-redux";

const ThemeSelectorProfile = () => {
  const { current, changeTheme } = useTheme();
  const dispatch = useDispatch();

  const themeToggle = async (theme) => {
    try {
      changeTheme(theme);

      const resultAction = await dispatch(themeToggleAction(theme));

      if (themeToggleAction.fulfilled.match(resultAction)) {
        console.log("Theme updated on server:", resultAction.payload);
      } else {
        console.warn("Theme update failed:", resultAction.error);
      }
    } catch (error) {
      console.error("Failed to change theme", error);
    }
  };

  useEffect(() => {
    console.log("Theme changed (local):", current);
  }, [current]);

  return (
    <div className="flex h-fit w-full pl-3 px-2 items-center justify-center">
      {["default", "sakura", "dark", "coffee", "dark2"].map((theme) => (
        <button
          key={theme}
          onClick={() => themeToggle(theme)}
          className={`text theme-${theme} text-stylep4 gap-2 rounded-full p-1 py-2 m-1 border-2
            ${current === theme ? "bg-skin-fill2 border-skin-colorActive" : "border-skin-colorBorder1"}`}
        >
          <FaPalette />
          <span className="hidden md:flex items-center justify-center w-[50px]">
            {theme}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ThemeSelectorProfile;
