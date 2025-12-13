import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../../store/actions/AuthThunks";
import {
  FaEllipsisV,
  FaShoppingCart,
  FaStore,
  FaSignOutAlt,
} from "react-icons/fa";
import ProfileImage from "../../ImagesComponent/components/ProfileImageComponent";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth || {});
  const { userAvatar } = profile || {};

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
    <div className="relative flex items-start" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition-colors duration-200"
      >
        <FaEllipsisV className="text-stylep2" />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg 
                     z-50 grid grid-rows-auto overflow-hidden"
        >
          <Link
            to="/home"
            className="grid grid-cols-[2rem_auto] items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-all"
          >
            <span className="h-7 w-7 rounded-full overflow-hidden">
              <ProfileImage profileImage={userAvatar} />
            </span>
            <span className="text-sm font-medium text-gray-800">Profile</span>
          </Link>

          <Link
            to="/user-store"
            className="grid grid-cols-[2rem_auto] items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-all"
          >
            <FaStore className="text-gray-700" />
            <span className="text-sm font-medium text-gray-800">My Store</span>
          </Link>

          <Link
            to="/cart-user"
            className="grid grid-cols-[2rem_auto] items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-all"
          >
            <FaShoppingCart className="text-gray-700" />
            <span className="text-sm font-medium text-gray-800">Cart</span>
          </Link>

          <Link
            to="/order-user"
            className="grid grid-cols-[2rem_auto] items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-all"
          >
            <FaShoppingCart className="text-gray-700" />
            <span className="text-sm font-medium text-gray-800">Order</span>
          </Link>

          <button
            onClick={handleClickLogOutButton}
            className="grid grid-cols-[2rem_auto] items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-all w-full text-left"
          >
            <FaSignOutAlt className="text-gray-700" />
            <span className="text-sm font-medium text-gray-800">Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
