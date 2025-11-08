import React, { useCallback, useEffect, useRef, useState } from "react";
import CardGrid from "../../components/Pagination/CardGrid";
import { useDispatch, useSelector } from "react-redux";
import { getStoresAction } from "../../store/actions/SellerThunks";
import PaginationComponent from "../../components/Pagination/Pagination";
import StoreCards from "../../components/Cards/StoreCard";

const StoresPage = () => {
  const dispatch = useDispatch();
  const { stores, isPending, pagination } = useSelector(
    (state) => state.seller
  );

  // Local pagination state controls sorting, page, limit
  const [paginationState, setPaginationState] = useState({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "asc",
  });

  const { page, limit, sortBy, sortOrder } = paginationState;

  const isMounted = useRef(true);

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

  const defaultPagination = {
  currentPage: 1,
  resultsPerPage: 10,
  sortBy: "createdAt",
  sortOrder: "asc",
  totalCounts: 4,
  totalPages: 1
};


  const handleFilterChange = (key, value) =>
    setPaginationState((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // reset page when filters change
    }));

  const handlePageChange = (newPage) =>
    setPaginationState((prev) => ({
      ...prev,
      page: newPage,
    }));

  const fetchStores = useCallback(async () => {
    if (!isMounted.current) return;

    try {
      const result = await dispatch(
        getStoresAction({
          page,
          limit,
          sortBy,
          sortOrder,
        })
      );
      console.log(result.payload.data);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, page, limit, sortBy, sortOrder]); // ✅ correct deps

  useEffect(() => {
    fetchStores();
    return () => {
      isMounted.current = false;
    };
  }, [fetchStores]);

  return (
    <div className="page-section">
      <div className="page-body">
        <div className="absolute opacity-5 inset-0 h-[90vw] w-full bg-gradient-to-r to-white from-transparent z-0"></div>
        <div className="text-div-bgblur"></div>

        {/* Filters */}
        <div className="text-div">
          <div className="flex flex-row items-center justify-end gap-3 bg-skin-primary p-2">
            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="border rounded-md px-2 py-1 bg-skin-colorContent text-skin-colorContent"
            >
              <option value="createdAt">Newest</option>
              <option value="storeName">Store Name</option>
              <option value="ratings.average">Top Rated</option>
              <option value="isVerified">Verified First</option>
            </select>

            {/* Sort Order */}
            <select
              value={sortOrder}
              onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
              className="border rounded-md px-2 py-1 bg-skin-colorContent text-skin-colorContent"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>

          {/* Data Grid + Pagination */}
          <CardGrid>
            {stores ? (
              defaultStores.map((store) => (
                <StoreCards key={store._id} store={store} />
              ))
            ) : (
              <span className="w-full h-full flex items-center justify-center">
                No data to unpack
              </span>
            )}
          </CardGrid>
          <PaginationComponent pagination={defaultPagination || null} />
        </div>
      </div>
    </div>
  );
};

export default StoresPage;
