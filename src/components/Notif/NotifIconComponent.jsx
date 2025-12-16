import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotifIconComponent = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { notifications, unreadCount } = useSelector(
    (state) => state.notif
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setShowDropDown(true)}
      onMouseLeave={() => setShowDropDown(false)}
    >
      {/* Notification Icon */}
      <button className="relative">
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropDown && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50">
          {notifications.length === 0 ? (
            <p className="p-3 text-sm text-gray-500">No notifications</p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif._id}
                className="p-3 text-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate(notif.link || "/")}
              >
                {notif.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotifIconComponent;
