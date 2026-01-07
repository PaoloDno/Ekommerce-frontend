import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../../store/actions/ProductThunks";
import CardGrid from "../../components/Pagination/CardGrid";
import { FaBars, FaFilter, FaSearch } from "react-icons/fa";
import PaginationComponent from "../../components/Pagination/Pagination";
import ProductCards from "../../components/Cards/ProductCards";
import { FaXmark } from "react-icons/fa6";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, pagination } = useSelector((state) => state.product);

  const [activeFilters, setActiveFilters] = useState({
    page: 1,
    limit: 6,
    sortBy: "createdAt",
    sortOrder: "asc",
    name: "",
    brand: "",
    categoryName: "",
    storeName: "",
    minPrice: 0,
    maxPrice: 1000000,
    minRating: 1,
  });

  const [draftFilters, setDraftFilters] = useState(activeFilters);

  const [filterDropdown, setFilterDropdown] = useState(false);
  const toggleDropdown = () => setFilterDropdown((prev) => !prev);

  const isMounted = useRef(false);

  const CLEAN_TEXT_REGEX = /^[^&<>"']*$/;

  const cleanInputs = (filters) => {
    const cleaned = {};

    for (const key in filters) {
      let value = filters[key];

      if (value === null || value === undefined || value === "") continue;

      if (typeof value === "string") {
        value = value.trim();
        if (!value) continue;
        if (!CLEAN_TEXT_REGEX.test(value)) continue;
        cleaned[key] = value;
        continue;
      }

      if (typeof value === "number" && !isNaN(value)) {
        cleaned[key] = value;
        continue;
      }

      cleaned[key] = value;
    }

    return cleaned;
  };

  const handleDraftChange = (key, value) => {
    const updated = {
      ...draftFilters,
      [key]: value,
      page: 1,
    };

    setDraftFilters(updated);
    if (key === "sortBy" || key === "sortOrder") {
      setActiveFilters(updated);
    }
  };

  const applyFilters = () => {
    setActiveFilters(draftFilters);
  };

  const handlePageChange = (newPage) => {
    setDraftFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
    setActiveFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const fetchProducts = useCallback(async () => {
    if (!isMounted.current) return;

    try {
      const cleaned = cleanInputs(activeFilters);
      await dispatch(fetchProductsAction(cleaned));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, activeFilters]);

  useEffect(() => {
    isMounted.current = true;
    fetchProducts();
  }, [fetchProducts]);


  return (
    <div className="page-body-background in-center">
      <div
        className="absolute opacity-45 inset-0 h-screen w-full 
        bg-gradient-back-transparent z-0"
      ></div>
      <div className="page-body-section in-center">
        <div className="product-body-section">
          {/** header of products */}
          <div className="flex flex-row lg:hidden items-center justify-end gap-1 bg-skin-primary bg-opacity-30 text-stylep4 p-2">
            <select
              value={draftFilters.sortBy}
              onChange={(e) => handleDraftChange("sortBy", e.target.value)}
              className="border rounded-md px-2 py-1 bg-skin-colorContent text-skin-colorContent w-1/3"
            >
              <option value="createdAt">Newest</option>
              <option value="name">Name</option>
              <option value="price">Prices</option>
              <option value="stock">Stocks</option>
              <option value="averageRating">Ratings</option>
              <option value="numberOfReviews">Reviews</option>
              <option value="storeName">Store</option>
              <option value="categoryName">Category</option>
            </select>

            <select
              value={draftFilters.sortOrder}
              onChange={(e) => handleDraftChange("sortOrder", e.target.value)}
              className="border rounded-md px-2 py-1 bg-skin-colorContent text-skin-colorContent w-1/3"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>

            <FaFilter
              size={14}
              className="border rounded-md box-content px-2 py-2 text-stylep3 bg-skin-colorContent text-skin-colorContent cursor-pointer"
              onClick={applyFilters}
            />
            {/* DROPDOWN BTN */}
            {!filterDropdown ? (
              <FaBars
                size={14}
                className="border rounded-md box-content px-2 py-2 text-stylep3 bg-skin-colorContent text-skin-colorContent cursor-pointer"
                onClick={toggleDropdown}
              />
            ) : (
              <FaXmark
                size={14}
                className="border rounded-md box-content px-2 py-2 text-stylep3 bg-skin-colorContent text-skin-colorContent cursor-pointer"
                onClick={toggleDropdown}
              />
            )}
          </div>

          <div
            className={`flex flex-col lg:hidden justify-start origin-top text-stylep3 gap-2 px-2 py-0
              w-full bg-skin-colorContent text-skin-colorContent overflow-hidden
              transition-all duration-500 ease-in-out relative  font-display
              ${filterDropdown ? "scale-y-100 h-fit" : "scale-y-0 h-0"}`}
          >
            <div className="flex flex-col in-center w-full p-2 gap-1">
              {/* PRODUCT NAME */}
              <div className="product-filter-dropdown-input-labels">
                <label className="truncate w-full">NAME OF PRODUCT</label>
                <input
                  type="text"
                  className="product-filter-dropdown-inputs"
                  value={draftFilters.name}
                  onChange={(e) => handleDraftChange("name", e.target.value)}
                />
              </div>

              {/* BRAND */}
              <div className="product-filter-dropdown-input-labels">
                <label className="truncate w-full">BRAND</label>
                <input
                  type="text"
                  className="product-filter-dropdown-inputs"
                  value={draftFilters.brand}
                  onChange={(e) => handleDraftChange("brand", e.target.value)}
                />
              </div>

              {/* STORE */}
              <div className="product-filter-dropdown-input-labels">
                <label className="truncate w-full">STORE</label>
                <input
                  type="text"
                  className="product-filter-dropdown-inputs"
                  value={draftFilters.storeName}
                  onChange={(e) =>
                    handleDraftChange("storeName", e.target.value)
                  }
                />
              </div>

              {/* CATEGORY */}
              <div className="product-filter-dropdown-input-labels">
                <label className="truncate w-full">CATEGORY</label>
                <input
                  type="text"
                  className="product-filter-dropdown-inputs"
                  value={draftFilters.categoryName}
                  onChange={(e) =>
                    handleDraftChange("categoryName", e.target.value)
                  }
                />
              </div>

              {/* MIN PRICE */}
              <div className="product-filter-dropdown-input-labels">
                <label className="truncate w-full">MIN PRICE</label>
                <input
                  type="number"
                  className="product-filter-dropdown-inputs"
                  value={draftFilters.minPrice}
                  onChange={(e) =>
                    handleDraftChange("minPrice", e.target.value)
                  }
                />
              </div>

              {/* MAX PRICE */}
              <div className="product-filter-dropdown-input-labels">
                <label className="truncate w-full">MAX PRICE</label>
                <input
                  type="number"
                  className="product-filter-dropdown-inputs"
                  value={draftFilters.maxPrice}
                  onChange={(e) =>
                    handleDraftChange("maxPrice", e.target.value)
                  }
                />
              </div>

              {/* MIN RATING */}
              <div className="product-filter-dropdown-input-labels">
                <label className="truncate w-full">MIN RATING</label>
                <select
                  className="product-filter-dropdown-inputs"
                  value={draftFilters.minRating}
                  onChange={(e) =>
                    handleDraftChange("minRating", e.target.value)
                  }
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5</option>
                </select>
              </div>

              {/* ACTION */}
              <button
                onClick={applyFilters}
                className="
                flex items-center justify-center gap-2 px-3 py-2 mt-2
                rounded-md bg-skin-green text-skin-color1 w-full"
              >
                SEARCH FILTER <FaFilter />
              </button>
            </div>
          </div>

          {/** desktop sidebar */}
          <div
            className="hidden lg:flex flex-col w-full h-full 
          items-start justify-start bg-skin-primary text-skin-color1 
          bg-opacity-80 text-stylep4 p-2 gap-2"
          >
            <span className="flex flex-row px-2 py-1 text-stylep2 w-full">
              <span className="w-3/5">FILTER PRODUCTS</span>
              <span
                className="flex in-center w-2/5 border rounded-md box-content 
              px-2 py-2 text-stylep3 
              bg-skin-green text-skin-color1 cursor-pointer bg-opacity-80"
                onClick={applyFilters}
              >
                <FaSearch size={14} /> <FaFilter size={14} />
              </span>
            </span>
            
            <span className="flex w-full px-2 mt-3">SORT BY</span>
            <select
              value={draftFilters.sortBy}
              onChange={(e) => handleDraftChange("sortBy", e.target.value)}
              className="border rounded-md px-2 py-1 bg-skin-colorContent text-skin-colorContent w-3/4"
            >
              <option value="createdAt">Newest</option>
              <option value="name">Name</option>
              <option value="price">Prices</option>
              <option value="stock">Stocks</option>
              <option value="averageRating">Ratings</option>
              <option value="numberOfReviews">Reviews</option>
              <option value="storeName">Store</option>
              <option value="categoryName">Category</option>
            </select>

            <select
              value={draftFilters.sortOrder}
              onChange={(e) => handleDraftChange("sortOrder", e.target.value)}
              className="border rounded-md px-2 py-1 bg-skin-colorContent text-skin-colorContent w-3/4"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>

          
            <span className="flex w-full px-2 mt-3">FILTER BY</span>

            <div className="flex flex-col in-center w-full p-2 gap-1">
              {/* PRODUCT NAME */}
              <div className="product-filter-dropdown-input-labels">
                <label className="truncate w-full">NAME OF PRODUCT</label>
                <input
                  type="text"
                  className="product-filter-dropdown-inputs"
                  value={draftFilters.name}
                  onChange={(e) => handleDraftChange("name", e.target.value)}
                />
              </div>

              {/* BRAND */}
              <div className="product-filter-dropdown-input-labels">
                <label className="truncate w-full">BRAND</label>
                <input
                  type="text"
                  className="product-filter-dropdown-inputs"
                  value={draftFilters.brand}
                  onChange={(e) => handleDraftChange("brand", e.target.value)}
                />
              </div>

              {/* STORE */}
              <div className="product-filter-dropdown-input-labels">
                <label className="truncate w-full">STORE</label>
                <input
                  type="text"
                  className="product-filter-dropdown-inputs"
                  value={draftFilters.storeName}
                  onChange={(e) =>
                    handleDraftChange("storeName", e.target.value)
                  }
                />
              </div>

              {/* CATEGORY */}
              <div className="product-filter-dropdown-input-labels">
                <label className="truncate w-full">CATEGORY</label>
                <input
                  type="text"
                  className="product-filter-dropdown-inputs"
                  value={draftFilters.categoryName}
                  onChange={(e) =>
                    handleDraftChange("categoryName", e.target.value)
                  }
                />
              </div>

              {/* MIN PRICE */}
              <div className="product-filter-dropdown-input-labels">
                <label className="truncate w-full">MIN PRICE</label>
                <input
                  type="number"
                  className="product-filter-dropdown-inputs"
                  value={draftFilters.minPrice}
                  onChange={(e) =>
                    handleDraftChange("minPrice", e.target.value)
                  }
                />
              </div>

              {/* MAX PRICE */}
              <div className="product-filter-dropdown-input-labels">
                <label className="truncate w-full">MAX PRICE</label>
                <input
                  type="number"
                  className="product-filter-dropdown-inputs"
                  value={draftFilters.maxPrice}
                  onChange={(e) =>
                    handleDraftChange("maxPrice", e.target.value)
                  }
                />
              </div>

              {/* MIN RATING */}
              <div className="product-filter-dropdown-input-labels">
                <label className="truncate w-full">MIN RATING</label>
                <select
                  className="product-filter-dropdown-inputs"
                  value={draftFilters.minRating}
                  onChange={(e) =>
                    handleDraftChange("minRating", e.target.value)
                  }
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5</option>
                </select>
              </div>

              {/* ACTION */}
              <button
                onClick={applyFilters}
                className="
                flex items-center justify-center gap-2 px-3 py-2 mt-2
                rounded-md bg-skin-green text-skin-color1 w-full"
              >
                SEARCH FILTER <FaFilter />
              </button>
            </div>
          </div>

          <CardGrid>
            {products.map((p) => (
              <ProductCards key={p._id} product={p} />
            ))}
          </CardGrid>
          <PaginationComponent
            pagination={pagination}
            onPageCHange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
