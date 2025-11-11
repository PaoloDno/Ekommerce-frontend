import { useCallback, useEffect, useRef, useState } from "react";
import CardGrid from "../../components/Pagination/CardGrid";
import { useDispatch, useSelector } from "react-redux";
import { getStoresAction } from "../../store/actions/SellerThunks";
import PaginationComponent from "../../components/Pagination/Pagination";
import StoreCards from "../../components/Cards/StoreCard";
import { FaBars, FaFilter } from "react-icons/fa";

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
    setDraftFilters((prev) => ({ ...prev, page: newPage }));
    setActiveFilters((prev) => ({ ...prev, page: newPage }));
  };

  const fetchStores = useCallback(async () => {
    if (!isMounted.current) return;

    try {
      const cleaned = cleanInputs(activeFilters);
      await dispatch(getStoresAction(cleaned));
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

  const inputStyle =
    "border px-2 py-1 rounded-md text-black bg-white border-skin-colorBorder1";

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
              <option value="storeName">Store Name</option>
              <option value="ratings.average">Top Rated</option>
              <option value="isVerified">Verified First</option>
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

            <FaBars
              className="border rounded-md box-content px-2 py-2 text-stylep3 bg-skin-colorContent text-skin-colorContent cursor-pointer"
              onClick={toggleDropdown}
            />
          </div>

          {/* Dropdown Filters */}
          <div
            className={`flex justify-start origin-top ${
              filterDropdown ? "scale-y-100 h-fit" : "scale-y-0 h-0"
            } w-full bg-skin-colorContent text-skin-colorContent overflow-hidden transition-all duration-500 ease-in-out`}
          >
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full justify-center items-center text-stylep3">
              
              <div className="grid grid-cols-[1fr_3fr] gap-2 items-center w-full md:w-5/6">
                <label>NAME OF STORE</label>
                <input
                  type="text"
                  className={inputStyle}
                  value={draftFilters.storeName}
                  onChange={(e) => handleDraftChange("storeName", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-[1fr_3fr] gap-2 items-center w-full md:w-5/6">
                <label>CITY</label>
                <input
                  type="text"
                  className={inputStyle}
                  value={draftFilters.city}
                  onChange={(e) => handleDraftChange("city", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-[1fr_3fr] gap-2 items-center w-full md:w-5/6">
                <label>COUNTRY</label>
                <input
                  type="text"
                  className={inputStyle}
                  value={draftFilters.country}
                  onChange={(e) => handleDraftChange("country", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-[1.25fr_3fr] md:grid-cols-[1fr_3fr] gap-2 items-center w-full md:w-5/6">
                <label>Verified</label>
                <select
                  className={inputStyle}
                  value={draftFilters.isVerified}
                  onChange={(e) => handleDraftChange("isVerified", e.target.value)}
                >
                  <option value="">All</option>
                  <option value="true">Verified Only</option>
                </select>
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
