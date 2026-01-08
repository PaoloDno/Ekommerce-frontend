import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaRegEnvelope,
  FaRegStar,
  FaStar,
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

const UserStorePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isPending } = useSelector((s) => s.auth);

  const [store, setStore] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  const fetchStore = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);

    try {
      const resultAction = await dispatch(getUserStoreAction());
      if (
        getUserStoreAction.fulfilled.match(resultAction) &&
        isMounted.current
      ) {
        setStore(resultAction.payload.data);
        console.log("Stores:", resultAction.payload.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (isMounted.current) setIsLoading(false);
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
      <div className="page-section">
        <div className="page-body">
          <p className="text-white p-4">Please login to continue</p>
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

  const renderStars = (input) => {
    const stars = [];
    const roundedRating = Math.floor(input);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= roundedRating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-gray-300" />
        )
      );
    }
    return stars;
  };

  const ProductBox = ({ name, productImage, price, stock, averageStar }) => {
    return (
      <div
        className="flex-none flex flex-col w-[150px] h-[200px] md:w-[150px] md:h-[220px]
      relative overflow-hidden px-1 py-2 bg-skin-colorContent bg-opacity-75 items-center 
      rounded-xl shadow-sm hover:shadow-md"
      >
        <div className="flex w-[135px] h-[170px] bg-white justify-center items-center rounded-lg overflow-hidden">
          <ProductImages productImages={productImage} />
        </div>
        <div className="flex flex-col justify-between mt-1 text-stylep2 w-full text-skin-colorContent">
          <span className="font-semibold truncate">{name}</span>
          <span className="flex flex-row items-center">
            {renderStars(averageStar)}
          </span>
          <span className="text-stylep3 opacity-90">₱{price}</span>
          <span className="text-stylep3 opacity-90">Stock: {stock}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="page-body-background in-center">
      <div className="page-body-section in-center relative">
        {/* Store Header */}
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
        <div className="flex flex-row w-full min-h-[85vh] in-center gap-2 z-10 px-1">
          <div
            className="hidden md:flex flex-col rounded-lg p-3 w-1/3 h-full min-h-[82vh]
          items-start justify-start bg-skin-primary"
          ></div>
          <div
            className="flex flex-col rounded-lg w-full md:w-2/3 h-full p-2 min-h-[82vh]
          items-start justify-start bg-skin-primary"
          >
            <div className="flex flex-row w-full px-2 items-end justify-end text-skin-color1 font-display text-stylep4">
              <div className="flex flex-col w-1/3 bg-skin-fill-4 bg-opacity-15 h-[20vh] items-baseline justify-end">
                <span className="flex flex-row w-full in-center">reviews - {store?.ratings.totalReviews}</span>
                <span className="flex text-styleh2 w-full in-center items-baseline justify-center">
                  {store?.ratings.average}
                </span>
                <span className="flex flex-row w-full in-center">
                  {renderStars(store?.ratings?.average)}
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
          </div>
        </div>

        <div className="flex w-full h-[170px] bg-skin-fill-1 bg-opacity-40 relative">
          <div className="flex bg-skin-colorContent w-full h-[100px]">
            <BannerImage bannerImage={store?.sellerBanner} />
          </div>
          <div className="absolute top-[50px] left-2 h-[90px] w-[90px] overflow-hidden border-2 border-skin-colorBorder1 rounded-full bg-skin-color-back">
            <StoreImage storeImage={store?.sellerLogo} />
          </div>
          <div className="absolute top-[140px] left-3 text-skin-color1 text-styleh4">
            {store?.store}
          </div>
        </div>

        {/* Store Info */}
        <div
          className="grid md:grid-cols-2 grid-cols-1 items-center justify-center w-full bg-skin-colorContent
          text-skin-colorContent p-2 mt-1 text-stylep3 gap-2 rounded-lg"
        >
          <span className="flex flex-row items-center gap-x-2">
            <FaRegEnvelope />
            <span>{store?.email}</span>
          </span>

          <span className="flex flex-row items-center gap-x-2">
            <FaPhone />
            <span>{store?.phone}</span>
          </span>

          <span className="flex flex-row items-center gap-x-2 col-span-2 text-opacity-90">
            <MdDescription />
            <span>{store?.description}</span>
          </span>

          <span className="flex flex-row items-start gap-x-2 col-span-2">
            <FaMapMarkerAlt className="mt-1" />
            <div className="flex flex-col">
              <span>
                {store?.address?.street || ""}, {store?.address?.city || ""}
              </span>
              <span>
                {store?.address?.country || ""},{" "}
                {store?.address?.postalCode || ""}
              </span>
            </div>
          </span>
        </div>

        {/* Products Section */}
        <div className="text-div">
          <h2 className="text-div-header">Products</h2>
          <div className="text-line w-full" />
          <div className="grid grid-cols-2 md:grid-cols-3 w-full my-2 items-center md:items-start justify-center gap-2">
            {/* Product Section */}
            <div className="flex flex-col bg-skin-colorContent bg-opacity-15 text-stylep3 rounded-md w-full h-full p-3">
              {store?.products?.length === 0 ? (
                <>
                  <p className="text-skin-color1 mb-1">
                    You don't own any products yet.
                  </p>
                  <h2 className="font-semibold mb-2 text-skin-color1">
                    Get Started!
                  </h2>
                </>
              ) : (
                <>
                  <p className="text-skin-color1 mb-1">
                    Continue adding products to build your STORE
                  </p>
                </>
              )}
              <Link
                to={`/create-product/${store?._id}`}
                className="bg-green-500 text-white mt-2 p-2 text-stylep2 flex w-full items-center justify-center rounded-md"
              >
                ADD A PRODUCT
              </Link>
            </div>

            {/* Rating Section */}
            <div className="grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_1.5fr] col-span-1 relative container items-center justify-start gap-3 bg-skin-colorContent bg-opacity-15 rounded-md w-full h-full p-3">
              {store?.ratings?.average > 2 ? (
                <FaThumbsUp className="size-8 w-full text-skin-color2" />
              ) : (
                <FaThumbsDown className="size-8 w-full text-skin-color2" />
              )}
              <span className="text-stylep3 text-skin-color1 leading-tight flex flex-col">
                <h3 className="font-semibold mb-1">Store Rating</h3>
                <span className="flex flex-row">
                  {renderStars(store?.ratings?.average)}
                </span>
                <p className="flex flex-row my-2">According to:</p>
                <p className="flex flex-row gap-2">
                  {" "}
                  {store?.ratings?.totalReviews} <FaUser />
                </p>
              </span>
            </div>

            {/* Security Section */}
            <div className="grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_1.5fr] col-span-2 md:col-span-1 relative container items-center justify-start gap-3 bg-skin-colorContent bg-opacity-15 rounded-md w-full h-full p-3">
              <FaLock className="size-8 w-full text-skin-color2" />
              <span className="text-stylep3 text-skin-color1 leading-tight flex flex-col">
                Keep your store secure.
                <button className="ml-1 px-2 py-1 w-fit text-white bg-gray-500 hover:bg-red-500 rounded-md transition-colors duration-150 my-2">
                  Learn More
                </button>
                We appreciate keeping our community great
              </span>
            </div>
          </div>

          <div className="text-line w-full" />
          <div className="flex flex-wrap w-full min-h-[140px] justify-start items-start bg-skin-colorContent gap-2 bg-opacity-10 m-1 p-1">
            {store?.products?.map((product) => (
              <Link
                to={`/product/${product._id}`}
                className="p-1"
                key={product._id}
              >
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
      </div>
    </div>
  );
};

export default UserStorePage;
