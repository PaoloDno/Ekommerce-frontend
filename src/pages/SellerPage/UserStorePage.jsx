import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FaAddressBook,
  FaMapMarkerAlt,
  FaPhone,
  FaRegEnvelope,
} from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserStoreAction } from "../../store/actions/SellerThunks";

const UserStorePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isPending } = useSelector((s) => s.auth);

  const [store, setStore] = useState({});
  const isMounted = useRef(true);

  const fetchStore = useCallback(async () => {
    if (!token) return;

    try {
      const resultAction = await dispatch(getUserStoreAction());
      if (
        getUserStoreAction.fulfilled.match(resultAction) &&
        isMounted.current
      ) {
        setStore(resultAction.payload.data);
        console.log(resultAction.payload.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, token]);

  useEffect(() => {
    isMounted.current = true;
    if (token) {
      fetchStore();
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
            className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
        Loading...
      </div>
    );
  }

  const ProductBox = ({ id, name, productImage, price, stock }) => {


    return (
      <div
        key={id}
        className="flex flex-col w-[130px] h-[130px] md:w-[120px] md:h-[170px] 
        container relative overflow-hidden
        px-1 py-2 
        bg-skin-colorContent bg-opacity-75 rounded-xl shadow-sm hover:shadow-md
        "
      >
        <div className="flex w-full h-1/2 bg-white rounded-lg overflow-hidden">
            <img
              src={productImage}
              alt={name}
              className="object-cover w-full h-full"
            />
        </div>
        <div className="flex flex-col justify-between mt-1 text-sm">
          <span className="font-semibold truncate">{name}</span>
          <span className="text-stylep3 text-gray-500">₱{price}</span>
          <span className="text-stylep3 text-gray-400">Stock: {stock}</span>
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
            <div className="flex bg-skin-colorContent w-full h-[100px]"></div>
            <div className="absolute top-[50px] left-2 h-[90px] w-[90px] border-2 border-skin-colorBorder1 rounded-full bg-skin-color-back"></div>
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
          <div className="flex flex-col w-full items-center md:ml-3 md:items-start justify-center">
            <p>You dont own a product</p>
            <h2>Get Started...</h2>
            <Link to={`/create-product/${store?._id}`} className="link-button">
              Start Selling
            </Link>
          </div>

          <h2 className="text-div-header">Products</h2>
          <div className="text-line w-full items-center justify-center" />
          <div className="flex flex-row w-full h-[140px] md:h-fit bg-skin-colorContent gap-2 bg-opacity-10 m-1 p-1">
              {store?.products?.map((product) => (
                <ProductBox
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  productImage={product.productImage}
                  price={product.price}
                  stock={product.stock}
                />
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

export default UserStorePage;
