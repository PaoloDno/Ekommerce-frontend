import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getStoreIdAction } from "../../store/actions/SellerThunks";

import {
  FaAddressBook,
  FaCross,
  FaDAndD,
  FaLock,
  FaMapMarkerAlt,
  FaPhone,
  FaPlusCircle,
  FaRegEnvelope,
  FaRegStar,
  FaStar,
  FaStore,
  FaThumbsDown,
  FaUser,
} from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import ProductImages from "../../components/ImagesComponent/components/ProductImageComponent";
import BannerImage from "../../components/ImagesComponent/components/BannerImageComponent";
import StoreImage from "../../components/ImagesComponent/components/StoreImageComponent";
import { FaThumbsUp } from "react-icons/fa6";

const StoreIdPage = () => {
  const { storeId } = useParams();
  console.log(storeId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, isPending } = useSelector((s) => s.auth);

  const [store, setStore] = useState({});
  const isMounted = useRef(true);
  const [loading, setLoading] = useState(true);

  const fetchStore = useCallback(async () => {
    if (!token) return;

    try {
      const resultAction = await dispatch(getStoreIdAction(storeId));
      if (getStoreIdAction.fulfilled.match(resultAction) && isMounted.current) {
        setStore(resultAction.payload.data);
        console.log(resultAction.payload.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (isMounted) setLoading(false);
    }
  }, [dispatch, token, storeId]);

  useEffect(() => {
    isMounted.current = true;
    if (token) {
      setLoading(true);
      fetchStore();
    }

    return () => {
      isMounted.current = false;
    };
  }, [fetchStore, token, storeId]);

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

  if (isPending) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        Backend Loading...
      </div>
    );
  }

  if (loading) return <div>Loading store...</div>;

  const renderStars = (input) => {
    const stars = [];
    const roundedRating = Math.floor(input);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= roundedRating ? (
          <FaStar key={i} className="text-yellow-400 shadow-sm" />
        ) : (
          <FaRegStar key={i} className="text-black shadow-sm" />
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
    <div className="page-section">
      <div className="page-body">
        <div
          className="absolute opacity-5 inset-0 h-[90vw] w-full
         bg-gradient-to-r to-white from-transparent z-0"
        ></div>

        <div className="text-div-bgblur"></div>

        <div className="text-div">
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
                  {store?.address?.street || ""}, {store?.address?.city || ""},
                </span>
                <span>
                  {store?.address?.country || ""},{" "}
                  {store?.address?.postalCode || ""},
                </span>
              </div>
            </span>
          </div>
        </div>

        <div className="text-div">
          <h2 className="text-div-header">Products</h2>
          <div className="text-line w-full items-center justify-center" />
          <div className="grid grid-cols-2 md:grid-cols-3 w-full my-2 items-center md:items-start justify-center gap-2">
            {/* Product Section */}

            <div className="grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_1.5fr] col-span-1 relative container items-center justify-start gap-3 bg-skin-colorContent bg-opacity-15 rounded-md w-full h-full p-3">
              <FaStore className="size-8 w-full text-skin-color2" />
              <span className="text-stylep3 text-skin-color1 leading-tight flex flex-col">
                Our community is great. and lots of different products to offer
              </span>
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

          <div className="text-line w-full items-center justify-center" />
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

        <div className="text-div">
          <div>//review display</div>
        </div>
      </div>
      <div className="page-background"></div>
    </div>
  );
};

export default StoreIdPage;
