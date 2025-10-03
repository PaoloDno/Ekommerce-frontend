import React, { useEffect, useState } from "react";
import { FaPalette } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { themeToggleAction } from "../../store/actions/AuthThunks";
import { useDispatch, useSelector } from "react-redux";

const ThemeSelectorProfile = () => {
  const { current, changeTheme } = useTheme();
  const dispatch = useDispatch();
  const [error, setError] = useState("")

  const themeToggle = async () => {
    
    const theme = current;
    

    try {

      const resultAction = await dispatch(themeToggleAction(theme));

      if (themeToggleAction.fulfilled.match(resultAction)) {
        console.log("Theme updated on server:", resultAction.payload);
      } else {
        console.warn("Theme update failed:", resultAction.error);
        setError("Something wrong happened");
      }
    } catch (error) {
      console.error("Failed to change theme", error);
    }
  };


  useEffect(() => {
    console.log("Theme changed (local):", current);
  }, [current]);

  return (
    <>
    <div className="flex h-fit w-full pl-3 px-2 items-center justify-center">
      {["default", "sakura", "dark", "coffee", "dark2"].map((theme) => (
        <button
          key={theme}
          onClick={() => changeTheme(theme)}
          className={` text-div-button
            text theme-${theme} text-stylep4 gap-2 rounded-full p-1 py-2 m-1 border-2
            ${current === theme ? "bg-skin-fill2 border-skin-colorActive" : "border-skin-colorBorder1"}`}
        >
          <FaPalette />
          <span className="hidden md:flex items-center justify-center w-[50px]">
            {theme}
          </span>
        </button>
      ))}
    </div>
    <div className="flex flex-col w-full justify-center items-center">
      <button className="text-div-button flex items-center justify-center px-3 py-1 my-2"
        onClick={() => themeToggle()}
      >
       SAVE THEME
      </button>
      <span className="text-stylep2 text-red-400">{error === "" ? "" : {error}}</span>
    </div>
    </>
  );
};

export default ThemeSelectorProfile;
