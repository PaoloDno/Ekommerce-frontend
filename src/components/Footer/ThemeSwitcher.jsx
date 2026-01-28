import React from "react";
import { FaPalette } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const ThemeButton = ({ theme, onClick, active }) => {
  return (
    <button
      onClick={() => onClick(theme)}
      className={`theme-${theme} flex w-[40px] h-[40px] in-center
        bg-skin-fill-1 text-skin-color1 rounded-md
        ${active ? "ring-2 ring-skin-colorHigh" : ""}`}
      title={theme}
    >
      <FaPalette size={14} />
    </button>
  );
};

export default function ThemeSwitcher() {
  const { current, changeTheme } = useTheme();

  const themes = ["default", "coffee", "dark", "sakura", "dark2", "forest"];

  return (
    <div className="flex flex-col items-center py-4">
      <span className="text-stylep3">Theme:</span>
      <span className="flex text-stylep1 text-skin-color1 capitalize">
        {current}
      </span>
      <div className="text-stylep4 flex flex-row space-x-3 mt-2">
        {themes.map((theme) => (
          <ThemeButton
            key={theme}
            theme={theme}
            onClick={changeTheme}
            active={current === theme}
          />
        ))}
      </div>
    </div>
  );
}
