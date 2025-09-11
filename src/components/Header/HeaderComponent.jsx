import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { FaHome, FaSearch, FaStore, FaTag, FaShoppingCart } from "react-icons/fa";

export default function HeaderComponent() {
  const { user, cartQuantity } = useAppContext();
  const brandName = "Ekommerce";

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/stores", label: "Store", icon: <FaStore /> },
    { to: "/categories", label: "Categories", icon: <FaTag /> },
  ];

  const AuthButtons = () => (
    <div className="space-x-2 flex flex-row items-center">
      <Link className="header-login hover:scale-110"
        to="/login"
      >LOGIN</Link>
      <button className="header-signup hover:scale-110">SIGNUP</button>
    </div>
  );

  const SearchBar = () => (
    <div className="flex items-center w-full min-w-[120px]">
      <input
        type="text"
        placeholder="Search Products..."
        className="header-search"
      />
      <span className="header-icons">
        <FaSearch />
      </span>
    </div>
  );

  return (
    <header className="bg-skin-primary w-full p-2">
      
      <div className="header-desktop">
        
        <h1 className="text-skin-color1 font-Opensans font-semibold text-styleh4 ml-2">
          {brandName}
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

        <div className="flex items-center space-x-4 text-skin-color1 border-l-2 border-skin-colorBorder1 pl-3">
          {user ? <span>
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
            Profile</span> : <AuthButtons />}
        </div>
      </div>

      <div className="flex flex-col md:hidden gap-2">
        <div className="flex justify-between items-center">
          <h1 className="text-skin-color1 font-bold text-styleh3">{brandName}</h1>
          {user ? <span>Profile</span> : <AuthButtons />}
        </div>
        <SearchBar />
        <nav className="flex justify-around relative text-skin-color1 text-stylep1 mt-2">
          {navLinks.map(({ to, label, icon }) => (
            <Link key={to} to={to}  className="header-link space-x-2">
              <span>{icon}</span>
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
