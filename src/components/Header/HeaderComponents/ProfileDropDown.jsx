import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../../store/actions/AuthThunks";
import { FaEllipsisV, FaHome, FaShoppingCart, FaUser } from "react-icons/fa";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth || {});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleClickLogOutButton = async () => {
    try {
      const resultAction = await dispatch(logoutAction());
      if (logoutAction.fulfilled.match(resultAction)) {
        console.log("Logged out successfully");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="flex relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="header-signup"
      >
        <FaEllipsisV className="text-stylep2"/>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 min-w-30 w-40 bg-skin-colorContent 
          border rounded shadow-md text-skin-colorContent z-50"
        >
          <Link to="/home" className="flex flex-row px-4 pt-1 text-stylep4
           hover:bg-gray-200 hover:text-black items-center">
            <FaHome /> <span className="mx-2">Home</span>
          </Link>
          <Link to="/cart" className="flex flex-row px-4 pt-1 text-stylep4
           hover:bg-gray-200 hover:text-black items-center">
            <FaShoppingCart /> <span className="mx-2">Cart</span>
          </Link>
          <button
            onClick={handleClickLogOutButton}
            className="flex flex-row w-full text-left px-4 pt-1 text-stylep4"
          >
            <FaUser /> <span className="mx-2">Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
