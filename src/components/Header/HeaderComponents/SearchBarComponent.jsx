import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("product");
  const navigate = useNavigate();

  const santiizeSearchInput = (input) => {
    let query = input.trim();
    query = query.replace(/<[^>]*>/g, "");
    query = query.replace(/[^a-zA-Z0-9\s\-'\&]/g, "");
    query = query.replace(/\s+/g, " ");

      return query;
    };
  

  const handleSearch = () => {
    const safeQuery = santiizeSearchInput(query)
    
    if (safeQuery) {
    navigate(`/search?type=${filter}&query=${encodeURIComponent(safeQuery)}`);
    }
  };

  return (
    <div className="header-search">
      {/* Dropdown */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="bg-skin-colorContent border border-skin-colorBorder1 text-skin-colorContent rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-skin-color1 transition-colors"
      >
        <option value="product">Product</option>
        <option value="category">Category</option>
        <option value="store">Store</option>
      </select>

      {/* Search Input */}
      <input
        type="text"
        placeholder={`Search ${filter}...`}
        className="header-search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      {/* Search Button */}
      <button
        className="header-search-icons"
        onClick={handleSearch}
      >
        <FaSearch />
      </button>
    </div>
  )
};

export default SearchBar;
