import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { FaHome, FaSearch, FaStore, FaTag } from "react-icons/fa";

export default function HeaderComponent() {
  const { user, cartQuantity, theme } = useAppContext();

  return (
    <header className="bg-skin-primary items-center justify-center pb-2 w-full">
      
      <div className="header-desktop gap-3">
        <h1 className="text-skin-color1 font-bold text-styleh3 ml-2 bg-yellow-200">Ekommerce</h1>
        
        <div className="flex items-center bg-green-200">
          <input
            type="text"
            placeholder="Search..."
            className="rounded text-stylep1 px-3 py-1 border border-skin-color2 w-full"
          />
          <span className="p-[1rem] text-stylep1"><FaSearch /></span>
        </div>

        <nav className="flex space-x-2 mx-2">
          <Link className="header-link" 
            to="/">
            <span className="header-link-icon"><FaHome /></span>
            <span className="mr-2">Home</span>
          </Link>
          <Link className="header-link" 
            to="/">
            <span className="header-link-icon"><FaStore /></span>
            <span className="mr-2">Store</span>
          </Link>
          <Link className="header-link" 
            to="/">
            <span className="header-link-icon"><FaTag /></span>
            <span className="mr-3">Categories</span>
          </Link>
          
        </nav>

        <div className="text-skin-color1">
          {user ? (
            <span>Profile</span>
          ) : (
            <div className="space-x-2">
              <button className="px-4 py-2 bg-skin-buttonColor text-white rounded">
                Login
              </button>
              <button className="px-4 py-2 border border-white rounded">
                Signup
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="header-mobile">
        <div className="flex w-full justify-between">
          <h1 className="text-skin-color1 font-bold text-styleh3">My Site</h1>
          {user ? (
            <span>Profile</span>
          ) : (
            <div className="space-x-2">
              <button className="px-4 py-2 bg-skin-buttonColor text-white rounded">
                Login
              </button>
              <button className="px-4 py-2 border border-white rounded">
                Signup
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center w-full">
          <input
            type="text"
            placeholder="Search..."
            className="rounded px-3 py-1 border w-full border-skin-color2"
          />
          <span>Icon</span>
        </div>
        <div className="flex">

        </div>
        <nav className="text-skin-color1 space-x-2 mx-4 text-stylep1 flex">
          <Link to="/">Home</Link>
          <Link to="/stores">Stores</Link>
          <Link to="/categories">Categories</Link>
        </nav>
      </div>
    </header>
  );
}
