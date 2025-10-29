import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import {
  FaHome,
  FaStore,
  FaTag,
  FaShoppingCart,
} from "react-icons/fa";
import { useSelector } from "react-redux";

import logoA from "./HeaderComponents/images/LogoHeader.png";
import logoB from "./HeaderComponents/images/EkommerceLogo.png";

import ProfileDropdown from "./HeaderComponents/ProfileDropDown";
import SearchBar from "./HeaderComponents/SearchBarComponent";

export default function HeaderComponent() {
  const { user, cartQuantity } = useAppContext();
  
  const { token, username } = useSelector((state) => state.auth);

  const brandName = "Ekommerce";

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/stores", label: "Stores", icon: <FaStore /> },
    { to: "/categories", label: "Categories", icon: <FaTag /> },
  ];

  const AuthButtons = () => (
    <div className="space-x-2 flex flex-row items-center">
      {!token ? (
        <>
          <Link className="header-login hover:scale-110" to="/login">
            LOGIN
          </Link>
          <Link className="header-signup hover:scale-110" to="/signup">
            SIGNUP
          </Link>
        </>
      ) : (
        <>
          <Link className="header-signup hover:scale-110" to="/home">
            {username ? username : "Profile"}
          </Link>
          
          <Link className="header-signup hover:scale-110" to="/cart">
            Cart
          </Link>
           <div className="header-signup hover:scale-110 w-fit">
            <ProfileDropdown />
          </div>
        </>
      )}
    </div>
  );

  return (
    <header className="flex items-center bg-skin-primary w-full p-2 z-30 lg:h-[65px]">
      <div className="header-desktop w-full">
        <h1 className="text-skin-color1 font-Merriweather font-semibold text-styleh4 ml-2 h-full overflow-hidden">
          <span className="hidden lg:flex flex-row gap-1 items-center justify-center overflow-hidden">
            <img src={logoB} alt="Ekommerce logo" className="h-[42px] w-[42px] bg-cover" /> {brandName}
          </span>
         
        </h1>

        <SearchBar />

        <nav className="flex">
          {navLinks.map(({ to, label, icon }) => (
            <Link key={to} to={to} className="header-link space-x-2">
              <span>{icon}</span>
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div
          className="flex items-center space-x-4 text-skin-color1 
        border-l-2 border-skin-colorBorder1 pl-3"
        >
          {user ? (
            <span>
              <Link to="/cart" className="relative">
                <span className="header-icons">
                  <FaShoppingCart />
                </span>
                {cartQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                    {cartQuantity}
                  </span>
                )}
              </Link>
              Profile
            </span>
          ) : (
            <AuthButtons />
          )}
        </div>
      </div>

      <div className="flex flex-col lg:hidden gap-2 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-skin-color1 font-bold text-styleh3">
             <span className="block">
            <img src={logoB} alt="Ekommerce title logo" className="h-[60px] w-auto" />
          </span>
          </h1>
          {user ? <span>Profile</span> : <AuthButtons />}
        </div>
        <SearchBar />
        <nav className="flex justify-around relative text-skin-color1 text-stylep1 mt-2">
          {navLinks.map(({ to, label, icon }) => (
            <Link key={to} to={to} className="header-link space-x-2">
              <span>{icon}</span>
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
