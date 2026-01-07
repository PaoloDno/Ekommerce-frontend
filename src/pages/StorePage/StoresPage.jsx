import { useCallback, useEffect, useRef, useState } from "react";
import CardGrid from "../../components/Pagination/CardGrid";
import { useDispatch, useSelector } from "react-redux";
import { getStoresAction } from "../../store/actions/SellerThunks";
import PaginationComponent from "../../components/Pagination/Pagination";
import StoreCards from "../../components/Cards/StoreCard";
import { FaBars, FaFilter, FaSearch } from "react-icons/fa";

const StoresPage = () => {
  const dispatch = useDispatch();
  const { stores, pagination } = useSelector((state) => state.seller);

  const [activeFilters, setActiveFilters] = useState({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "asc",
    isVerified: "",
    storeName: "",
    city: "",
    country: "",
    minrating: "",
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
        if (!value || !CLEAN_TEXT_REGEX.test(value)) continue;
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

  // auto-apply sort changes
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
    setDraftFilters((prev) => ({ ...prev, page: newPage }));
    setActiveFilters((prev) => ({ ...prev, page: newPage }));
  };

  const fetchStores = useCallback(async () => {
    if (!isMounted.current) return;

    try {
      const cleaned = cleanInputs(activeFilters);
      await dispatch(getStoresAction(cleaned));
      console.log("Stores: ", stores);
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, activeFilters]);

  useEffect(() => {
    isMounted.current = true;
    fetchStores();
  }, [fetchStores]);

  // Default Store Fallbacks
  const defaultStores = [
    {
      _id: "store_001",
      storeName: "Moonbrew Café",
      description: "Warm drinks and cold stares since 2022",
      email: "hello@moonbrew.com",
      phone: "09123456789",
      isVerified: false,
      sellerBanner: "A1",
      sellerLogo: "A1",
      createdAt: "2025-10-04T07:12:40.100Z",
      updatedAt: "2025-11-01T14:28:03.641Z",
      owner: "owner_001",
      products: ["prod_11", "prod_12"],
      ratings: { average: 4.2, totalReviews: 37 },
    },
    {
      _id: "store_002",
      storeName: "ByteBurger",
      description: "Digital patties, analog happiness",
      email: "support@byteburger.com",
      phone: "09771112233",
      isVerified: true,
      sellerBanner: "A1",
      sellerLogo: "A1",
      createdAt: "2025-10-03T11:20:12.500Z",
      updatedAt: "2025-10-03T11:20:12.500Z",
      owner: "owner_002",
      products: [],
      ratings: { average: 3.5, totalReviews: 12 },
    },
    {
      _id: "store_003",
      storeName: "SpectraHub",
      description: "Accessories carved from starlight",
      email: "contact@spectrahub.com",
      phone: "09224455667",
      isVerified: false,
      sellerBanner: "A1",
      sellerLogo: "A1",
      createdAt: "2025-10-08T14:59:44.595Z",
      updatedAt: "2025-11-01T11:54:31.781Z",
      owner: "owner_003",
      products: ["p101", "p102", "p103"],
      ratings: { average: 4.0, totalReviews: 19 },
    },
    {
      _id: "store_004",
      storeName: "TerraThreads",
      description: "Wear the world lightly",
      email: "hello@terrathreads.shop",
      phone: "09998887766",
      isVerified: false,
      sellerBanner: "A1",
      sellerLogo: "A1",
      createdAt: "2025-10-10T18:57:17.385Z",
      updatedAt: "2025-11-03T07:39:06.771Z",
      owner: "owner_004",
      products: ["p201", "p202", "p203", "p204"],
      ratings: { average: 2.9, totalReviews: 7 },
      address: {
        street: "13 Suntrail Road",
        city: "Quezon City",
        country: "Philippines",
        postalCode: "1100",
      },
    },
  ];

  const fallbackPagination = {
    currentPage: 1,
    resultsPerPage: 10,
    totalCounts: 4,
    totalPages: 1,
  };

  return (
    <div className="page-body-background in-center">
      <div
        className="absolute opacity-45 inset-0 h-screen w-full 
        bg-gradient-back-transparent z-0"
      ></div>
      <div className="page-body-section in-center">

        <div className="store-body-section in-center">
          <div
            className="hidden lg:flex flex-col w-full h-full 
          items-start justify-start bg-skin-primary text-skin-color1 
          bg-opacity-50 text-stylep4 p-2 gap-2"
          >
            <span className="flex flex-row px-2 py-1 text-stylep2 w-full">
              <span className="w-3/5">FILTER STORES</span>
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
              className="border rounded-md px-2 py-1 bg-skin-colorContent text-skin-colorContent bg-opacity-80 w-2/3"
            >
              <option value="createdAt">Newest</option>
              <option value="storeName">Store Name</option>
              <option value="ratings.average">Top Rated</option>
              <option value="isVerified">Verified First</option>
            </select>

            <select
              value={draftFilters.sortOrder}
              onChange={(e) => handleDraftChange("sortOrder", e.target.value)}
              className="border rounded-md px-2 py-1 bg-skin-colorContent text-skin-colorContent bg-opacity-80 w-2/3"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>

            <span className="flex w-full px-2 mt-3">FILTER BY</span>

            <div className="store-filter-dropdown-input-labels">
              <label className="truncate flex flex-row w-full">
                NAME OF STORE
              </label>
              <input
                type="text"
                className="store-filter-dropdown-inputs"
                value={draftFilters.storeName}
                onChange={(e) => handleDraftChange("storeName", e.target.value)}
              />
            </div>

            <div className="store-filter-dropdown-input-labels">
              <label className="truncate flex flex-row w-full">CITY</label>
              <input
                type="text"
                className="store-filter-dropdown-inputs"
                value={draftFilters.city}
                onChange={(e) => handleDraftChange("city", e.target.value)}
              />
            </div>

            <div className="store-filter-dropdown-input-labels">
              <label className="truncate flex flex-row w-full">COUNTRY</label>
              <input
                type="text"
                className="store-filter-dropdown-inputs"
                value={draftFilters.country}
                onChange={(e) => handleDraftChange("country", e.target.value)}
              />
            </div>

            <div className="store-filter-dropdown-input-labels">
              <label className="truncate flex flex-row w-full">Verified</label>
              <select
                className="store-filter-dropdown-inputs"
                value={draftFilters.isVerified}
                onChange={(e) =>
                  handleDraftChange("isVerified", e.target.value)
                }
              >
                <option value="">All</option>
                <option value="true">Verified Only</option>
              </select>
            </div>

            <div className="store-filter-dropdown-input-labels">
              <label className="truncate flex flex-row w-full">
                Min-Rating
              </label>
              <select
                className="store-filter-dropdown-inputs"
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
              className="flex flex-row w-full px-3 py-2 mt-2 bg-skin-green gap-2 justify-center text-skin-color1 rounded-md items-center"
            >
              SEARCH FILTER <FaFilter />
            </button>
          </div>

          {/** header mobile **/}
          <div className="flex flex-row lg:hidden items-center justify-end gap-1 md:gap-3 bg-skin-primary bg-opacity-50 text-stylep4 p-2 w-full">
            <select
              value={draftFilters.sortBy}
              onChange={(e) => handleDraftChange("sortBy", e.target.value)}
              className="border rounded-md px-2 py-1 bg-skin-colorContent text-skin-colorContent bg-opacity-90 w-1/3"
            >
              <option value="createdAt">Newest</option>
              <option value="storeName">Store Name</option>
              <option value="ratings.average">Top Rated</option>
              <option value="isVerified">Verified First</option>
            </select>

            <select
              value={draftFilters.sortOrder}
              onChange={(e) => handleDraftChange("sortOrder", e.target.value)}
              className="border rounded-md px-2 py-1 bg-skin-colorContent text-skin-colorContent bg-opacity-90 w-1/3"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>

            <FaFilter
              className="border rounded-md box-content px-2 py-2 text-stylep3 bg-skin-colorContent text-skin-colorContent cursor-pointer bg-opacity-80"
              onClick={applyFilters}
            />

            <FaBars
              className="border rounded-md box-content px-2 py-2 text-stylep3 bg-skin-colorContent text-skin-colorContent cursor-pointer bg-opacity-80"
              onClick={toggleDropdown}
            />
          </div>

          {/* Dropdown Filters */}
          <div
            className={`flex lg:hidden justify-start origin-top ${
              filterDropdown ? "scale-y-100 h-fit" : "scale-y-0 h-0"
            } w-full bg-skin-color-back text-skin-color1 overflow-hidden transition-all duration-500 ease-in-out`}
          >
            <div className="px-2 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full justify-center items-center text-stylep4">
              <div className="store-filter-dropdown-input-labels">
                <label className="truncate flex flex-row w-full">
                  NAME OF STORE
                </label>
                <input
                  type="text"
                  className="store-filter-dropdown-inputs"
                  value={draftFilters.storeName}
                  onChange={(e) =>
                    handleDraftChange("storeName", e.target.value)
                  }
                />
              </div>

              <div className="store-filter-dropdown-input-labels">
                <label className="truncate flex flex-row w-full">CITY</label>
                <input
                  type="text"
                  className="store-filter-dropdown-inputs"
                  value={draftFilters.city}
                  onChange={(e) => handleDraftChange("city", e.target.value)}
                />
              </div>

              <div className="store-filter-dropdown-input-labels">
                <label className="truncate flex flex-row w-full">COUNTRY</label>
                <input
                  type="text"
                  className="store-filter-dropdown-inputs"
                  value={draftFilters.country}
                  onChange={(e) => handleDraftChange("country", e.target.value)}
                />
              </div>

              <div className="store-filter-dropdown-input-labels">
                <label className="truncate flex flex-row w-full">
                  Verified
                </label>
                <select
                  className="store-filter-dropdown-inputs"
                  value={draftFilters.isVerified}
                  onChange={(e) =>
                    handleDraftChange("isVerified", e.target.value)
                  }
                >
                  <option value="">All</option>
                  <option value="true">Verified Only</option>
                </select>
              </div>

              <div className="store-filter-dropdown-input-labels">
                <label className="truncate flex flex-row w-full">
                  Min-Rating
                </label>
                <select
                  className="store-filter-dropdown-inputs"
                  value={draftFilters.minrating}
                  onChange={(e) =>
                    handleDraftChange("minrating", e.target.value)
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

              <button
                onClick={applyFilters}
                className="flex flex-row px-3 py-2 bg-skin-green gap-2 justify-center text-skin-color1 rounded-md items-center"
              >
                SEARCH FILTER <FaFilter />
              </button>
            </div>
          </div>

          {/* desktop sidebar  */}

          {/* STORE GRID */}
          <CardGrid>
            {(stores || defaultStores).map((s) => (
              <StoreCards key={s._id} store={s} />
            ))}
          </CardGrid>

          {/* PAGINATION */}
          <PaginationComponent
            pagination={pagination || fallbackPagination}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default StoresPage;
