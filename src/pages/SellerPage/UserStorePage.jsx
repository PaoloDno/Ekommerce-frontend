import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaPlusCircle,
  FaRegEnvelope,
  FaRegStar,
  FaStar,
  FaStore,
  FaThumbsDown,
  FaThumbsUp,
  FaUser,
} from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserStoreAction } from "../../store/actions/SellerThunks";
import ProductImages from "../../components/ImagesComponent/components/ProductImageComponent";
import BannerImage from "../../components/ImagesComponent/components/BannerImageComponent";
import StoreImage from "../../components/ImagesComponent/components/StoreImageComponent";
import OrderStatusBar from "./components/OrderStatusBar";

const UserStorePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isPending } = useSelector((s) => s.auth);

  const [store, setStore] = useState({});

  const sellerId = store?._id || null;

  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

    const renderStars = (input) => {
    const stars = [];
    const roundedRating = Math.floor(input);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= roundedRating ? (
          <FaStar
            key={i}
            className="text-yellow-400 bg-skin-cart bg-opacity-10"
          />
        ) : (
          <FaRegStar
            key={i}
            className="text-gray-400 bg-skin-cart bg-opacity-10"
          />
        )
      );
    }
    return stars;
  };

  const allReviews = useMemo(() => {
    if (!store?.reviews) return [];

    const low3 = Array.isArray(store.reviews.low3) ? store.reviews.low3 : [];
    const top3 = Array.isArray(store.reviews.top3) ? store.reviews.top3 : [];

    const merged = [...low3, ...top3].filter(
      (r) => r && r._id && r.product && r.product._id
    );

    // de-duplicate by review id
    return Array.from(new Map(merged.map((r) => [r._id, r])).values());
  }, [store]);


  

  const fetchStore = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);

    try {
      const resultAction = await dispatch(getUserStoreAction());
      if (getUserStoreAction.fulfilled.match(resultAction)) {
        if (resultAction.payload.hasStore === false) {
          navigate("/create-store");
          return;
        }
        console.log("payload", resultAction.payload);
        setStore(resultAction.payload.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (isMounted.current) setIsLoading(false);
      console.log("STORE set: ", store);
      console.log("storeId: ", store?._id);
    }
  }, [dispatch, token]);

  useEffect(() => {
    isMounted.current = true;
    if (token) {
      fetchStore();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted.current = false;
    };
  }, [fetchStore, token]);

  if (!token) {
    return (
      <div className="hidden md:flex flex-col w-full bg-skin-fill-2 min-h-[40vh] bg-opacity-25 rounded-lg px-2">
        <div className="flex justify-between items-center mb-2">
          <p className="text-white text-stylep2 p-4">
            Please login to continue
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 mt-2 bg-green-500 text-white rounded-md hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (isPending || isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        Loading...
      </div>
    );
  }



   

  const ProductBox = ({ name, productImage, price, stock, averageStar }) => {
    return (
      <div
        className="flex-none flex flex-col w-[140px] h-[180px]
      relative overflow-hidden bg-skin-colorContent bg-opacity-75 items-center 
      rounded-xl shadow-sm hover:shadow-md"
      >
        <div className="flex w-full min-h-[135px] h-[135px] bg-white justify-center items-center rounded-lg overflow-hidden">
          <ProductImages productImages={productImage} />
        </div>
        <div className="grid grid-cols-2 px-2 justify-between mt-1 text-stylep4 w-full text-skin-colorContent">
          <span className="font-semibold truncate">{name}</span>
          <span className="flex flex-row items-center w-full px-2 py-1 bg-opacity-20 bg-black rounded-full">
            {renderStars(averageStar)}
          </span>
          <span className="text-stylep4 opacity-90 truncate">₱{price}</span>
          <span className="text-stylep4 opacity-90 truncate">
            Stock: {stock}
          </span>
        </div>
      </div>
    );
  };

  


  // Desktop Review Pagination
  const ReviewPaginationDesktop = ({ reviews }) => {
    const [reviewPage, setReviewPage] = useState(0);
    const REVIEWS_PER_PAGE = 6; // 3x2 grid

    const uniqueReviews = useMemo(() => {
      return Array.from(new Map(reviews.map((r) => [r._id, r])).values());
    }, [reviews]);

    const totalPages = Math.ceil(uniqueReviews.length / REVIEWS_PER_PAGE);

    const pagedReviews = uniqueReviews.slice(
      reviewPage * REVIEWS_PER_PAGE,
      reviewPage * REVIEWS_PER_PAGE + REVIEWS_PER_PAGE
    );

    return (
      <div className="hidden md:flex flex-col w-full min-h-[40vh] bg-skin-fill-2 bg-opacity-25 rounded-lg p-2">
        <span className="text-skin-color1 text-styleh4 font-display">
          STORE ORDERS
        </span>
        <span className="flex py-2 pb-5 w-full">
          {sellerId && <OrderStatusBar sellerId={sellerId} />}
        </span>
        <div className="flex justify-between items-center mb-2">
          <span className="text-skin-color1 text-styleh4 font-display">
            REVIEWS - {uniqueReviews.length}
          </span>
          <div className="flex gap-2 ">
            <button
              onClick={() => setReviewPage((p) => Math.max(0, p - 1))}
              className="px-2 py-1 bg-skin-fill-3 text-skin-colorContent rounded w-[130px]"
              disabled={reviewPage === 0}
            >
              ‹
            </button>
            <button
              onClick={() =>
                setReviewPage((p) => Math.min(totalPages - 1, p + 1))
              }
              className="px-2 py-1 bg-skin-fill-3 text-skin-colorContent rounded w-[130px]"
              disabled={reviewPage >= totalPages - 1}
            >
              ›
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 items-start justify-start">
          {pagedReviews.map((review, index) => (
            <div
              onClick={() => navigate(`/product/${review?.product._id}`)}
              key={`${index}${review._id}`}
              className="bg-skin-colorContent text-skin-colorContent rounded-xl px-3 py-1 flex flex-col shadow-md text-stylep4 items-start justify-start h-[120px]"
            >
              {" "}
              <span className="grid grid-cols-[1.25fr_7.5fr] in-center w-full">
                <span className="font-bold text-stylep3">
                  {review?.user?.username || "Anonymous"}
                </span>
                <div className="flex items-center justify-end my-1">
                  {renderStars(review.rating)}
                </div>
              </span>
              <p className="text-stylep4 line-clamp-2 flex-grow text-center">
                “{review.comment}”
              </p>
              <div className="flex w-full items-center gap-2 mt-2 pt-2 border-t border-skin-border1">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <ProductImages productImages={review.product.productImage} />
                </div>
                <span className="text-[10px] truncate opacity-70">
                  {review.product.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Desktop Product Pagination
  const ProductPaginationDesktop = ({ products = [], storeId }) => {
    const [productPage, setProductPage] = useState(0);
    const PRODUCTS_PER_PAGE = 3; // 3x2 grid

    const totalPages = Math.ceil((products?.length || 0) / PRODUCTS_PER_PAGE);
    const pagedProducts = products.slice(
      productPage * PRODUCTS_PER_PAGE,
      productPage * PRODUCTS_PER_PAGE + PRODUCTS_PER_PAGE
    );

    return (
      <div className="hidden md:flex flex-col w-full bg-skin-fill-2 min-h-[40vh] bg-opacity-25 rounded-lg px-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-skin-color1 text-styleh4 font-display">
            PRODUCTS - {products.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setProductPage((p) => Math.max(0, p - 1))}
              className="px-2 py-1 bg-skin-fill-3 text-skin-colorContent rounded w-[130px]"
              disabled={productPage === 0}
            >
              ‹
            </button>
            <button
              onClick={() =>
                setProductPage((p) => Math.min(totalPages - 1, p + 1))
              }
              className="px-2 py-1 bg-skin-fill-3 text-skin-colorContent rounded w-[130px]"
              disabled={productPage >= totalPages - 1}
            >
              ›
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 items-start justify-start w-full h-[40vh] gap-1">
          <div
            onClick={() => navigate(`/create-product/${storeId}`)}
            className="flex flex-col h-[180px] w-[140px] in-center bg-skin-colorContent bg-opacity-25
         rounded-xl border-4 border-skin-colorBorder1 text-skin-color1"
          >
            <FaPlusCircle size={26} />
            <span className="text-stylep2 font-display capitalize ">
              Add A Product
            </span>
          </div>

          {pagedProducts.map((product, index) => (
            <Link to={`/product/${product._id}`} key={`${index}${product._id}`}>
              <ProductBox
                name={product.name}
                productImage={product.productImage}
                price={product.price}
                stock={product.stock}
                averageStar={product.averageRating}
              />
            </Link>
          ))}
        </div>
      </div>
    );
  };

  {
    /**
    
    MAIN CONTENT
    
    **/
  }

  return (
    <div className="page-body-background in-center">
      <div className="page-body-section in-center relative">
        {/* Store Banner */}
        <div className="absolute inset-0 flex bg-skin-colorContent w-full h-[100px] z-0">
          <BannerImage bannerImage={store?.sellerBanner} />
        </div>
        <div className="flex w-full min-h-[100px] z-20 relative">
          <div
            className="absolute rounded-full overflow-hidden in-center -bottom-1/2 left-4 md:left-[40px]
           bg-skin-colorContent w-[120px] h-[120px] z-20 border-2 border-skin-colorBorder1 border-opacity-60"
          >
            <StoreImage storeImage={store?.sellerLogo} />
          </div>
        </div>

        {/* Store Header */}
        <div className="flex flex-row w-full min-h-[85vh] items-start justify-start gap-2 z-10 px-1 bg-skin-fill-2">
          {/** DESKTOP sidebar */}
          <div
            className="hidden md:flex flex-col rounded-lg p-3 w-1/3 h-[82vh] min-h-[82vh]
          items-start justify-start bg-skin-primary text-skin-color1 relative overflow-hidden"
          >
            <div className="absolute flex w-full h-full blur-xl bg-white/5 z-10" />
            <div className="flex flex-col w-full bg-opacity-15 p-2 min-h-[18vh] bg-skin-fill-4 items-baseline justify-end">
              <div className="flex w-full h-[30px] "></div>

              <span className="flex flex-row w-full in-center text-stylep2">
                reviews - {store?.ratings?.totalReviews || 0}
              </span>
              <span className="flex text-styleh2 w-full in-center items-baseline justify-center">
                {store?.ratings?.average}
              </span>
              <span className="flex flex-row items-center mx-auto w-fit px-2 py-1 bg-opacity-60 bg-black rounded-full in-center">
                {renderStars(store?.ratings?.average || 1)}
              </span>
            </div>
            {/** sidebar basic info */}
            <span className="flex flex-row gap-x-2 w-full items-center justify-start text-stylep3 truncate">
              <FaStore size={14} />
              <span className="text-stylep1">{store?.storeName}</span>
            </span>
            <span className="flex flex-row gap-x-2 w-full items-center justify-start text-stylep3">
              <FaRegEnvelope size={14} />
              <span>{store?.email}</span>
            </span>

            <span className="flex flex-row gap-x-2 w-full items-center justify-start text-stylep3">
              <FaPhone size={14} />
              <span>{store?.phone}</span>
            </span>

            <span className="flex flex-row gap-x-2 w-full items-center justify-start text-stylep3 truncate">
              <MdDescription size={14} />
              <span>{store?.description}</span>
            </span>

            <div className="flex flex-col min-h-[25vh] w-full  p-2 text-stylep4 overflow-hidden relative">
              <div className="absolute flex w-full h-full blur-xl bg-black/5 z-10" />
              <div className="flex flex-col w-full h-full in-center z-20">
                <span className="text-skin-color1 text-styleh4 font-display">
                  METRICS
                </span>

                <div className="w-full bg-skin-colorContent bg-opacity-90 text-skin-colorContent rounded-md py-2 px-1">
                  {/* Orders */}
                  <div className="border-b border-skin-border1">
                    <span className="cursor-pointer px-1 py-2 font-bold select-none">
                      Orders
                    </span>
                    <div className="flex flex-col gap-1 px-3">
                      <span>
                        Total Orders: {store?.metrics?.orders?.totalOrders}
                      </span>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="border-b border-skin-border1">
                    <span className="cursor-pointer px-1 py-2 font-bold select-none">
                      Products
                    </span>
                    <div className="flex flex-col gap-1 px-3 ">
                      <span>
                        Total Products:{" "}
                        {store?.metrics?.products?.totalProducts}
                      </span>
                      <span>
                        Low Stock: {store?.metrics?.products?.lowStockProducts}
                      </span>
                      <span>
                        Out of Stock:{" "}
                        {store?.metrics?.products?.outOfStockProducts}
                      </span>
                    </div>
                  </div>

                  {/* Revenue */}
                  <div>
                    <span className="cursor-pointer px-1 py-2 font-bold select-none">
                      Revenue
                    </span>
                    <div className="flex flex-col gap-1 px-3">
                      <span>
                        Total Revenue: {store?.metrics?.revenue?.totalRevenue}
                      </span>
                      <span>
                        Monthly Revenue:{" "}
                        {store?.metrics?.revenue?.monthlyRevenue}
                      </span>
                      <span>
                        Daily Revenue: {store?.metrics?.revenue?.dailyRevenue}
                      </span>
                      <span>
                        Avg Order Value:{" "}
                        {store?.metrics?.revenue?.averageOrderValue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/** desktop 1/3  */}
          <div
            className="md:flex md:flex-col hidden rounded-lg w-full h-full p-2 min-h-[82vh]
          items-start justify-start bg-skin-primary space-y-1"
          >
            <ReviewPaginationDesktop
              reviews={[...allReviews]}
            />

            <ProductPaginationDesktop
              products={store.products || []}
              storeId={store?._id}
            />
          </div>

          {/** mobile  */}
          <div
            className="flex flex-col md:hidden rounded-lg w-full h-full p-2 min-h-[82vh]
          items-start justify-start bg-skin-primary space-y-1"
          >
            <div className="flex flex-row md:hidden w-full px-2 items-end justify-end text-skin-color1 font-display text-stylep4">
              <div className="flex flex-col w-1/3 bg-skin-fill-4 bg-opacity-15 p-2 h-[20vh] items-baseline justify-end">
                <span className="flex flex-row w-full in-center text-stylep2">
                  reviews - {store?.ratings.totalReviews || 0}
                </span>
                <span className="flex text-styleh2 w-full in-center items-baseline justify-center">
                  {store?.ratings.average}
                </span>
                <span className="flex flex-row items-center mx-auto w-fit px-2 py-1 bg-opacity-60 bg-black rounded-full in-center">
                  {renderStars(store?.ratings?.average || 0)}
                </span>
              </div>
              <div className="flex flex-col w-2/3 items-end justify-end">
                <span className="flex flex-row gap-x-2 w-2/3 items-center justify-end">
                  <span className="text-styleh3">{store?.storeName}</span>
                </span>
                <span className="flex flex-row gap-x-2 w-2/3 items-center justify-end">
                  <span>{store?.email}</span> <FaRegEnvelope size={14} />
                </span>

                <span className="flex flex-row gap-x-2 w-2/3 items-center justify-end">
                  <span>{store?.phone}</span> <FaPhone size={14} />
                </span>

                <span className="flex flex-row gap-x-2 w-2/3 items-center justify-end">
                  <span>{store?.description}</span> <MdDescription size={14} />
                </span>
              </div>
            </div>

            {sellerId && <OrderStatusBar sellerId={sellerId} />}

            {/** dispaly reviews mobile */}

            <span className="text-skin-color1 text-styleh4 font-display">
              REVIEWS
            </span>
            <div
              className="flex flex-row w-full h-[30vh] min-h-[30vh] relative bg-skin-fill-2 p-2 rounded-lg bg-opacity-25 
                overflow-hidden overflow-x-auto items-center justify-start gap-3
                text-skin-colorContent text-stylep3"
            >
              {Array.from(
                new Map(
                  [
                    ...(store?.reviews?.low3 || []),
                    ...(store?.reviews?.top3 || []),
                  ].map((r) => [r._id, r])
                ).values()
              ).map((review) => (
                <div
                  key={review._id}
                  onClick={() => navigate(`/product/${review.product._id}`)}
                  className="min-w-[140px] h-full bg-skin-colorContent text-skin-colorContent rounded-xl p-3 flex flex-col shadow-md"
                >
                  {/* Rating */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-bold text-stylep2 truncate">
                      {review?.user?.username || "Anonymous"}
                    </span>
                    <span className="flex flex-row items-center justify-center w-full px-2 py-1 bg-opacity-20 bg-black rounded-full">
                      {renderStars(review?.rating || 1)}
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-stylep4 line-clamp-4 mt-2 flex-grow text-center">
                    “{review.comment}”
                  </p>

                  {/* Product row */}
                  <div className="flex flex-row items-center gap-2 mt-2 pt-2 border-t border-skin-border1">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <ProductImages
                        productImages={review.product.productImage}
                      />
                    </div>
                    <span className="text-[10px] truncate opacity-70">
                      {review.product.name || "404 error"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* store metrics accordion */}
            <div className="flex flex-col md:hidden min-h-[25vh] w-full bg-skin-fill-2 bg-opacity-40 p-2 text-stylep4">
              <span className="text-skin-color1 text-styleh4 font-display">
                METRICS
              </span>

              <div className="w-full bg-skin-colorContent bg-opacity-60 text-skin-colorContent rounded-xl overflow-hidden">
                {/* Orders */}
                <details className="border-b border-skin-border1">
                  <summary className="cursor-pointer px-1 py-2 font-bold select-none">
                    Orders
                  </summary>
                  <div className="flex flex-col gap-1 px-3">
                    <span>
                      Total Orders: {store?.metrics?.orders?.totalOrders || 0}
                    </span>
                  </div>
                </details>

                {/* Products */}
                <details className="border-b border-skin-border1">
                  <summary className="cursor-pointer px-1 py-2 font-bold select-none">
                    Products
                  </summary>
                  <div className="flex flex-col gap-1 px-3 ">
                    <span>
                      Total Products:{" "}
                      {store?.metrics?.products?.totalProducts || 0}
                    </span>
                    <span>
                      Low Stock:{" "}
                      {store?.metrics?.products?.lowStockProducts || 0}
                    </span>
                    <span>
                      Out of Stock:{" "}
                      {store?.metrics?.products?.outOfStockProducts || 0}
                    </span>
                  </div>
                </details>

                {/* Revenue */}
                <details>
                  <summary className="cursor-pointer px-1 py-2 font-bold select-none">
                    Revenue
                  </summary>
                  <div className="flex flex-col gap-1 px-3">
                    <span>
                      Total Revenue:{" "}
                      {store?.metrics?.revenue?.totalRevenue || 0}
                    </span>
                    <span>
                      Monthly Revenue:{" "}
                      {store?.metrics?.revenue?.monthlyRevenue || 0}
                    </span>
                    <span>
                      Daily Revenue:{" "}
                      {store?.metrics?.revenue?.dailyRevenue || 0}
                    </span>
                    <span>
                      Avg Order Value:{" "}
                      {store?.metrics?.revenue?.averageOrderValue || 0}
                    </span>
                  </div>
                </details>
              </div>
            </div>

            {/** add product or display */}
            <span className="text-skin-color1 text-styleh4 font-display">
              PRODUCTS
            </span>
            <div
              className="flex flex-row w-full h-[30vh] relative bg-skin-fill-2 p-2 rounded-lg bg-opacity-25 
                overflow-hidden overflow-x-auto items-center justify-start
                text-skin-colorContent text-stylep3"
            >
              <div
                onClick={() => navigate(`/create-product/${store?._id}`)}
                className="flex flex-col h-[180px] min-w-[136px] in-center bg-skin-colorContent bg-opacity-25 rounded-xl border-4 border-skin-colorBorder1 text-skin-color1"
              >
                <FaPlusCircle size={26} />
                <span className="text-stylep2 font-display capitalize">
                  Add A Product
                </span>
              </div>

              {store?.products?.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <ProductBox
                    name={product.name || "No Name"}
                    productImage={product.productImage || []}
                    price={product.price || 0}
                    stock={product.stock || 0}
                    averageStar={product.averageRating || 0}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStorePage;
