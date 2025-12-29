import React from "react";
import { FaPalette } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeSwitcher() {
  const { current, changeTheme } = useTheme();

  return (
    <div className="flex flex-col items-center py-4">
      <span className="text-sm">Theme:</span>
      <div className="text-styleh4 flex flex-row space-x-3 mt-2">
        <button
          onClick={() => changeTheme("default")}
          className="theme-default themes-buttons"
        >
          <FaPalette className="mr-1" />
        </button>
        <button
          onClick={() => changeTheme("coffee")}
          className="theme-coffee themes-buttons"
        >
          <FaPalette className="mr-1" />
        </button>
        <button
          onClick={() => changeTheme("dark")}
          className="theme-dark themes-buttons"
        >
          <FaPalette className="mr-1" />
        </button>
        <button
          onClick={() => changeTheme("sakura")}
          className="theme-sakura themes-buttons"
        >

          <FaPalette className="mr-1" />
        </button>
        <button
          onClick={() => changeTheme("dark2")}
          className="theme-dark2 themes-buttons"
        >
          <FaPalette className="mr-1" />
        </button>
        <button
          onClick={() => changeTheme("forest")}
          className="theme-forest themes-buttons"
        >
          <FaPalette className="mr-1" />
        </button>
      </div>
      <span className="flex text-styleh4 text-skin-color1">{current}</span>
    </div>
  );
}
