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
import { FaBoxArchive } from "react-icons/fa6";
import ProfileImage from "../../ImagesComponent/components/ProfileImageComponent";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.auth || {});
  const { userAvatar, username } = profile || {};

  const closeDropdown = () => setOpen(false);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutAction());
      if (!logoutAction.fulfilled.match(result)) {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error logging out:", err);
    } finally {
      closeDropdown();
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="relative header-component-call-to-action-buttons-cart-component in-center"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="header-component-call-to-action-buttons-cart-icon in-center relative"
      >
        <span className="flex w-[32px] h-[32px] rounded-full overflow-hidden">
          <ProfileImage profileImage={userAvatar} />
        </span>
        <span className="header-component-call-to-action-buttons-cart-arrowdown">
          <FaEllipsisV />
        </span>
      </button>

      {open && (
        <div className="header-dropdowns relative">
          {/* Profile */}
          <Link
            to="/home"
            onClick={closeDropdown}
            className="flex flex-col items-center justify-center p-1 rounded-xl border-2
            border-skin-colorBorder1 border-opacity-25 shadow-md
            bg-skin-colorContent text-skin-colorContent"
          >
            <span className="text-stylep2 -mb-2">Visit Profile</span>

            <span className="grid grid-cols-[2rem_auto] items-center gap-2 px-4 py-2 -mb-1">
              <span className="h-7 w-7 rounded-full overflow-hidden">
                <ProfileImage profileImage={userAvatar} />
              </span>
              <span className="text-stylep3 font-medium">
                {username}
              </span>
            </span>
          </Link>

          {/* Store */}
          <Link
            to="/user-store"
            onClick={closeDropdown}
            className="grid grid-cols-[2rem_auto] items-center gap-2 px-4 py-2
            bg-skin-colorContent text-skin-colorContent transition-all"
          >
            <FaStore size={16} />
            <span className="text-stylep3 font-medium">My Store</span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart-user"
            onClick={closeDropdown}
            className="grid grid-cols-[2rem_auto] items-center gap-2 px-4 py-2
            transition-all bg-skin-colorContent text-skin-colorContent"
          >
            <FaShoppingCart />
            <span className="text-sm font-medium">Cart</span>
          </Link>

          {/* Orders */}
          <Link
            to="/order-user"
            onClick={closeDropdown}
            className="grid grid-cols-[2rem_auto] items-center gap-2 px-4 py-2
            hover:bg-skin-fill-4 hover:text-skin-colorHigh transition-all
            bg-skin-colorContent text-skin-colorContent"
          >
            <FaBoxArchive />
            <span className="text-sm font-medium">Order</span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="absolute left-0 right-0 bottom-2 w-full flex items-center justify-center gap-2
            px-3 py-3 bg-opacity-80
            bg-skin-fill-4 text-skin-colorHigh transition-all"
          >
            <span className="flex items-center text-stylep2 font-medium">
              Log Out <FaSignOutAlt className="mx-2" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
