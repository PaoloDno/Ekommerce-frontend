import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="header-signup hover:scale-110"
      >
        Profile
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
          <Link to="/home" className="block px-4 py-2 hover:bg-gray-200">
            Home
          </Link>
          <Link to="/cart" className="block px-4 py-2 hover:bg-gray-200">
            Cart
          </Link>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;