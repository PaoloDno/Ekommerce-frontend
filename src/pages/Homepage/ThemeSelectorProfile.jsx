import React, { useEffect, useState } from "react";
import { FaPalette, FaSave } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { themeToggleAction } from "../../store/actions/AuthThunks";
import { useDispatch, useSelector } from "react-redux";
import { FaXmark } from "react-icons/fa6";

const ThemeSelectorProfile = () => {
  const { current, changeTheme } = useTheme();
  const dispatch = useDispatch();
  const [error, setError] = useState("")

  const [ editActive, setEditActive] = useState(false);

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
    } finally {
      setEditActive(false);
    }
  };


  useEffect(() => {
    console.log("Theme changed (local):", current);
  }, [current]);

  return (
    <div className="flex flex-col space-y-1 w-full">

    { editActive ? (
    <div className="flex flex-col w-full min-h-[15vh]">
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 min-h-[10vh] bg-skin-colorContent text-skin-colorContent
        w-full px-2 items-center justify-center">
        {["default", "sakura", "dark", "coffee", "dark2", "forest"].map((theme) => (
          
          <button
            key={theme}
            onClick={() => changeTheme(theme)}
            className={`w-full flex flex-row items-center justify-center text-stylep2 text-skin-color1
              gap-2 px-2 py-2 m-1 border-2 border-opacity-5 shadow-md bg-skin-colorContent rounded-full
              ${current === theme ? "border-skin-colorBorder1" : "border-skin-colorBorder2"}`}
          >
            <FaPalette className={`bg-skin-fill-4 text-skin-colorHigh theme-${theme} box-content p-1 px-2 rounded-full`} size={14}/>
            <span className={`flex items-center text-skin-colorContent text-stylep3 justify-center capitalize`}>
              {theme}
            </span>
          </button>
        ))}
      </div>
      <div className="flex flex-row w-full justify-center items-center gap-4">
        <button className="text-skin-color1 bg-skin-green text-stylep3 space-x-2 rounded-full font-display
        flex items-center justify-center px-3 py-2 my-2 font-bold w-full sm:w-[160px]"
          onClick={() => themeToggle()}
        >
        <FaSave /><span>SAVE THEME</span>
        </button>
        <button className="text-skin-color1 bg-skin-red text-stylep3 space-x-2 rounded-full font-display
        flex items-center justify-center px-3 py-2 my-2 font-bold w-full sm:w-[160px]"
          onClick={() => setEditActive((s) => !s)}
        >
        <FaXmark /><span>CANCEL</span>
        </button>
        
        </div>
        <span className="text-stylep3 min-h-[4vh]">{error && <span className="text-stylep3 min-h-[4vh]">{error}</span>}</span>
      
    </div>
    ) : (
    <div className="flex flex-col min-h-[15vh] in-center">
        <span>We like to make the experience more personalized</span>
        <button className="text-skin-color1 bg-skin-cart text-stylep3 rounded-full font-display
        flex items-center justify-center px-3 py-2 my-2 space-x-2 font-bold w-full sm:w-[160px]"
          onClick={() => setEditActive((s) => !s)}
        >
        <FaPalette/> <span>Change Theme</span>
        </button>
    </div>
    )}
    </div>
  );
};

export default ThemeSelectorProfile;
