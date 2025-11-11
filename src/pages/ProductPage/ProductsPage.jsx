import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../../store/actions/ProductThunks";
import CardGrid from "../../components/Pagination/CardGrid";
import { FaBars, FaFilter } from "react-icons/fa";
import PaginationComponent from "../../components/Pagination/Pagination";
import ProductCards from "../../components/Cards/ProductCards";

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
    page: 1
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

  const inputStyle =
    "border px-2 py-1 rounded-md text-black bg-white border-skin-colorBorder1";

  return (
    <div className="page-section">
      <div className="page-body">
        <div className="absolute opacity-5 inset-0 h-[90vw] w-full bg-gradient-to-r to-white from-transparent -z-10"></div>
        <div className="text-div-bgblur -z-10"></div>

        <div className="text-div">
          <div className="flex flex-row items-center justify-end gap-3 bg-skin-primary text-stylep3 p-2">
            <select
              value={draftFilters.sortBy}
              onChange={(e) => handleDraftChange("sortBy", e.target.value)}
              className="border rounded-md px-2 py-1 bg-skin-colorContent text-skin-colorContent"
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
              className="border rounded-md px-2 py-1 bg-skin-colorContent text-skin-colorContent"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>

            <FaFilter
              className="border rounded-md box-content px-2 py-2 text-stylep3 bg-skin-colorContent text-skin-colorContent cursor-pointer"
              onClick={applyFilters}
            />
            {/* DROPDOWN BTN */}
            <FaBars
              className="border rounded-md box-content px-2 py-2 text-stylep3 bg-skin-colorContent text-skin-colorContent cursor-pointer"
              onClick={toggleDropdown}
            />
          </div>

          <div
            className={`flex justify-start origin-top ${
              filterDropdown ? "scale-y-100 h-fit" : "scale-y-0 h-0"
            } w-full bg-skin-colorContent text-skin-colorContent overflow-hidden transition-all duration-500 ease-in-out`}
          >
            <div className="p-4 flex flex-col md:grid-cols-2 lg:grid-cols-4 gap-3 w-full justify-center items-center text-stylep3">
              {/* Product NAME */}
              <div className="grid grid-cols-[1fr_3fr] gap-2 items-center w-full md:w-5/6">
                <label>NAME OF PRODUCT </label>
                <input
                  type="text"
                  className={inputStyle}
                  value={draftFilters.name}
                  onChange={(e) => handleDraftChange("name", e.target.value)}
                />
              </div>

            <div className="grid grid-cols-[1fr_3fr] gap-2 items-center w-full md:w-5/6">
              <label>BRAND</label>
              <input
                type="text"
                className={inputStyle}
                value={draftFilters.brand}
                onChange={(e) => handleDraftChange("brand", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-[1fr_3fr] gap-2 items-center w-full md:w-5/6">
              <label>Store</label>
              <input
                type="text"
                className={inputStyle}
                value={draftFilters.storeName}
                onChange={(e) => handleDraftChange("storeName", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-[1fr_3fr] gap-2 items-center w-full md:w-5/6">
              <label>Category</label>
              <input
                type="text"
                className={inputStyle}
                value={draftFilters.categoryName}
                onChange={(e) =>
                  handleDraftChange("categoryName", e.target.value)
                }
              />
            </div>
            <div className="col-span-1 md:col-span-2 w-full items-center flex flex-row">
              <div className="grid grid-cols-[1fr_3fr] gap-2 items-center w-full md:w-5/6">
                <label>Min-Price</label>
                <input
                  type="number"
                  className={inputStyle}
                  value={draftFilters.minPrice}
                  onChange={(e) =>
                    handleDraftChange("minPrice", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-[1fr_3fr] gap-2 items-center w-full md:w-5/6">
                <label>Max-Price</label>
                <input
                  type="number"
                  className={inputStyle}
                  value={draftFilters.maxPrice}
                  onChange={(e) =>
                    handleDraftChange("maxPrice", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-[1fr_3fr] gap-2 items-center w-full md:w-5/6">
              <label>Min-Rating</label>
              <select
                className={inputStyle}
                value={draftFilters.minRating}
                onChange={(e) => handleDraftChange("minRating", e.target.value)}
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5</option>
              </select>
            </div>
            <button
              onClick={applyFilters}
              className="flex flex-row px-3 py-2 bg-green-500 gap-2 justify-center text-white rounded-md hover:bg-slate-700 items-center"
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
      </div></div>
    </div>
  );
};

export default ProductsPage;
