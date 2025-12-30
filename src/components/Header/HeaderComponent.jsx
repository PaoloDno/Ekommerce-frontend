import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import {
  FaHome,
  FaStore,
  FaShoppingBag,
  FaSearch,
  FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";

import logoB from "./HeaderComponents/images/EkommerceLogo.png";

import ProfileDropdown from "./HeaderComponents/ProfileDropDown";
import SearchBar from "./HeaderComponents/SearchBarComponent";
import CartIconComponent from "../Cart/CartIconComponent";
import ProfileImage from "../ImagesComponent/components/ProfileImageComponent";

/* headerStyles.css */

export default function HeaderComponent() {
  const { user, cartQuantity } = useAppContext();

  const { token, profile } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const brandName = "Ekommerce";

  const navigate = useNavigate();

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/stores", label: "Stores", icon: <FaStore /> },
    { to: "/products", label: "Products", icon: <FaShoppingBag /> },
  ];

  const AuthButtons = () => (
    <div className="header-component-call-to-action in-right mr-2">
      {!token ? (
        <>
          <Link
            className="header-component-call-to-action-buttons in-center bg-gradient-primary-buttons-85 hover:bg-gradient-primary-buttons-95"
            to="/login"
          >
            LOGIN
          </Link>
          <Link
            className="header-component-call-to-action-buttons in-center bg-gradient-primary-buttons-130 hover:bg-gradient-primary-buttons-110"
            to="/signup"
          >
            SIGNUP
          </Link>
        </>
      ) : (
        <>
          <CartIconComponent cart={items} />

          <div className="flex in-center py-1 px-2 text-skin-color1 text-stylep2">
            <ProfileDropdown />
          </div>
        </>
      )}
    </div>
  );

  return (
    <header className="in-center page-header-section style-primary">
      <div className="page-header-section-4-desktop in-center">
        <div className="header-component-logo-section in-center style-primary">
          <span className="flex flex-row cursor-pointer gap-1 items-center justify-center overflow-hidden">
            <img
              src={logoB}
              alt="Ekommerce logo"
              className="header-component-icon-logo"
            />
          </span>
          {brandName}
        </div>
        <SearchBar />
        <nav className="header-component-navigation">
          {navLinks.map(({ to, label, icon }) => (
            <Link key={to} to={to} className="header-component-navigation-link">
              <span className="px-1 hidden lg:flex">{icon}</span>
              <span className="text-stylep4">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="header-component-call-to-action in-right">
          <AuthButtons />
        </div>
      </div>

      <div className="page-header-section-4-mobile er px-2">
        <h1
          className="flex flex-row in-center text-skin-color1 
          font-bold text-stylep2 gap-1 cursor-pointer" onClick={() => navigate("/")}
        >
          <span className="flex h-[38px] w-[38px] mx-1 in-center">
            <img
              src={logoB}
              alt="Ekommerce title logo"
              className="flex h-[38px] w-[38px]"
            />
          </span>
          <span className="flex font-sans">{brandName}</span>
        </h1>
        <span className="hidden md:flex">
          <SearchBar />
        </span>
        <div className="mobile-action-button  mx-2">
          {!token ? (
            <>
              <SearchBar />
            </>
          ) : (
            <>
              <SearchBar />
              <CartIconComponent cart={items} />

              <div className="flex in-center py-1 px-2 text-skin-color1 text-stylep2">
                <ProfileDropdown />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bottom-navigation-4-mobile">
        <div className="absolute inset-0 w-full h-full bg-gradient-primary-buttons-85 p-2 -z-10 bg-opacity-80 backdrop-blur-md"></div>
        <ul className="flex h-full items-center justify-around text-skin-colorContent bg-skin-colorContent bg-opacity-75">
          <Link className="flex flex-col items-center text-xs" to="/">
            <FaHome size={17} />
            <span>Home</span>
          </Link>
          <Link className="flex flex-col items-center text-xs" to="/stores">
            <FaStore size={17} />
            <span>Stores</span>
          </Link>
          <Link className="flex flex-col items-center text-xs" to="products">
            <FaShoppingBag size={17} />
            <span>Products</span>
          </Link>

          {token ? (
            <Link className="flex flex-col items-center text-xs" to="/home">
              <FaUser size={17} />
              <span>Profile</span>
            </Link>
          ) : (
            <Link className="flex flex-col items-center text-xs" to="/login">
              <FaUser size={17} />
              <span>LOGIN</span>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
