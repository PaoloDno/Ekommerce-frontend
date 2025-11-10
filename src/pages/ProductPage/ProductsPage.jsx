import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../store/actions/ProductThunks";
import CardGrid from "../../components/Pagination/CardGrid";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { store, pagination } = useSelector((state) => state.product);

  const [activeFilters, setActiveFilters] = useState({
    page: 1,
    limit: 8,
    sortBy: "createdAt",
    name: "",
    brand: "",
    categoryName: "",
    storeName: "",
    minPrice: 0,
    maxPrice: 1000000,
    minRating: 1,
  });

  const { resultsPerPage, currentPage, skipDocuments, sortBy, sortOrder } =
    req.pagination;

  const [draftFilters, setDraftFilters] = useState(activeFilters);

  const [filterDropdown, setFilterDropdown] = useState(false);
  const toggleDropdown = () => setFilterDropdown((prev) => !prev);

  const isMounted = useRef(false);

  const CLEAN_TEXT_REGEX = /^[^&<>"']*$^/;

  const cleanInputs = (filters) => {
    const cleaned = {};

    console.log(filters);

    for (const key of filters) {
      let value = filters[key];

      if (value === null || value === undefined || value === "") continue;
      if (typeof value === "string") {
        value = value.trim();

        if (value.length === 0) continue;

        // clean string
        if (!CLEAN_TEXT_REGEX.test(value)) {
          console.warn(`Input rejected for "${key}"`);
          continue;
        }

        cleaned[key] = value;
        continue;
      }

      if (!isNaN(value) && value !== "") {
        cleaned[key] = Number(value);
        continue;
      }

      cleaned[key] = value;
    }

    return cleaned;
  };

  const handleDraftChange = (key, value) => {
    setDraftFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
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
      await dispatch(getProductsAction(cleaned));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, activeFilters]);

  useEffect(() => {
    isMounted.current = true;
    fetchStores();
  }, []);

  const inputStyle =
    "border px-2 py-1 rounded-md text-black bg-white border-skin-colorBorder1";

  /*
    const allowedSorts = [
      "createdAt",
      "price",
      "stock",
      "averageRating",
      "numOfReviews",
      "storeName",
      "categoryName",
    ];
    */

  return (
    <div className="page-section">
      <div className="page-body">
        <div className="absolute opacity-5 inset-0 h-[90vw] w-full bg-gradient-to-r to-white from-transparent z-0"></div>
        <div className="text-div-bgblur"></div>

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
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full justify-center items-center text-stylep3">
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
            <div className="col-span-2 w-full items-center flex flex-row">
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
                value={draftFilters.minrating}
                onChange={(e) => handleDraftChange("minrating", e.target.value)}
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
          
        </CardGrid>
      </div>
    </div>
  );
};
