import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { FaHome, FaStore, FaTag} from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";

export default function FooterComponent() {
  const { user } = useAppContext();
  const brandName = "Ekommerce";

  return (
    <footer className="footer-section ">
      <div className="grid-footer grid grid-cols-1 sm:grid-cols-3 gap-6 p-1">
        
        <div className="footer-component flex flex-col">
          <span className="text-lg font-bold">About</span>
          <span className="font-semibold">{brandName}</span>
          <p className="text-sm">Demo E-commerce store</p>
          <div className="flex flex-col space-y-1 mt-2">
            <Link to="/" className="flex items-center space-x-2 hover:text-skin-colorHigh transition">
              <FaHome /> <span>Home</span>
            </Link>
            <Link to="/stores" className="flex items-center space-x-2 hover:text-skin-colorHigh transition">
              <FaStore /> <span>Store</span>
            </Link>
            <Link to="/categories" className="flex items-center space-x-2 hover:text-skin-colorHigh transition">
              <FaTag /> <span>Categories</span>
            </Link>
          </div>
        </div>

        
        <div className="footer-component flex flex-col space-y-2">
          <span className="text-lg font-bold">Products</span>
          <Link to="/categories" className="hover:text-skin-colorHigh">
            Browse Categories
          </Link>
          <Link to="/stores" className="hover:text-skin-colorHigh">
            Find Stores
          </Link>
        </div>

        
        <div className="footer-component flex flex-col space-y-2">
          <span className="text-lg font-bold">Stores</span>
          {user ? (
            <Link to={`/profile/${user._id}`} className="hover:text-skin-colorHigh">
              Your Store
            </Link>
          ) : (
            <Link to="/login" className="hover:text-skin-colorHigh">
              Become a Seller
            </Link>
          )}
        </div>
      </div>

      
      <ThemeSwitcher />

      
      <div className="flex flex-col items-center mt-4 space-y-2">
        <span className="text-stylep2">© 2025 {brandName} Demo Ecommerce Company. All rights reserved.</span>
      </div>
    </footer>
  );
}
