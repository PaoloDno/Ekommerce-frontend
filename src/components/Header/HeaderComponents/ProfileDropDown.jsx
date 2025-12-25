import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../../store/actions/AuthThunks";
import {
  FaEllipsisV,
  FaShoppingCart,
  FaStore,
  FaSignOutAlt,
  FaArrowAltCircleDown,
} from "react-icons/fa";
import ProfileImage from "../../ImagesComponent/components/ProfileImageComponent";

/* headerStyles.css */

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth || {});
  const { userAvatar, username } = profile || {};

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
    <div
      className="relative header-component-call-to-action-buttons-cart-component in-center"
      ref={dropdownRef}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="header-component-call-to-action-buttons-cart-icon in-center relative"
      >
        <span className="flex w-[32px] h-[32px] rounded-full overflow-hidden bg-opacity-15">
          <ProfileImage profileImage={userAvatar} />
        </span>
        <span className="header-component-call-to-action-buttons-cart-arrowdown">
          <FaEllipsisV />{" "}
        </span>
      </button>

      {open && (
        <div className="header-dropdowns relative">
          <Link
            to="/home"
            className="flex flex-col hover:bg-gray-100 items-center shadow-md justify-center border-2 border-skin-colorBorder1 border-opacity-25 rounded-xl p-1"
          >
            <span className="flex text-stylep2 -mb-2"> Visit Profile </span>
            <span className="grid grid-cols-[2rem_auto] items-center gap-2 px-4 py-2 -mb-1  transition-all">
            <span className="h-7 w-7 rounded-full overflow-hidden">
              <ProfileImage profileImage={userAvatar} />
            </span>
            <span className="text-stylep3 font-medium text-gray-800">{username}</span>
            </span>
          </Link>

          <Link
            to="/user-store"
            className="grid grid-cols-[2rem_auto] items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-all text-stylep3"
          >
            <FaStore className="text-gray-700" />
            <span className="text-stylep3 font-medium text-gray-800">My Store</span>
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
            className="absolute left-0 right-0 bottom-2 w-full flex-row flex items-center gap-2 px-3 py-2 justify-center bg-skin-primary bg-opacity-10 hover:bg-gray-400 transition-all"
          >
            <span className="flex flex-row w-full text-stylep3 items-center justify-center font-medium text-gray-800">
              Log Out <FaSignOutAlt className="text-gray-700 mx-2" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
