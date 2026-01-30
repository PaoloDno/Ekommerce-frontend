import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCross, FaSearch } from "react-icons/fa";
import { FaCrosshairs, FaXmark } from "react-icons/fa6";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("product");
  const navigate = useNavigate();

  /* handle search */
  const santiizeSearchInput = (input) => {
    let query = input.trim();
    query = query.replace(/<[^>]*>/g, "");
    query = query.replace(/[^a-zA-Z0-9\s\-'\&]/g, "");
    query = query.replace(/\s+/g, " ");

    return query;
  };

  const handleSearch = () => {
    const safeQuery = santiizeSearchInput(query);
    if (!safeQuery) return;

    if (filter === "product") {
      navigate(`/products/search/${encodeURIComponent(safeQuery)}`);
    }

    if (filter === "category") {
      navigate(`/products/category/${encodeURIComponent(safeQuery)}`);
    }

    if (filter === "store") {
      navigate(`/products/store/${encodeURIComponent(safeQuery)}`);
    }
  };

  /* handle open */
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (evernt) => {
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
    <div className="header-component-search" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex text-stylep2 text-skin-color1 cursor-pointer bg-opacity-10 
      bg-skin-fill-2 ml-2 p-3 relative opacity-100 md:opacity-80 hover:opacity-100 in-center"
      >
        <FaSearch className="text-stylep2" />
      </button>
      {/* Dropdown */}

      {open && (
        <div className={`header-component-search-bar animate-grow-in`}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="flex border text-skin-colorContent bg-skin-colorContent text-stylep3 rounded-md px-2 py-1 shadow-lg"
          >
            <option value="product">Product</option>
            <option value="category">Category</option>
            <option value="store">Store</option>
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder={`Search ${filter}...`}
            className="header-component-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          {/* Search Button */}
          <button
            className="header-component-search-icon"
            onClick={handleSearch}
          >
            <FaSearch />
          </button>
          <button
            className="header-component-search-icon"
            onClick={() => setOpen(false)}
          >
            <FaXmark />
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
