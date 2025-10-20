import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getProductIdAction } from "../../store/actions/ProductThunks";
import { createReviewAction } from "../../store/actions/ReviewThunks";

import { FaCartShopping, FaNoteSticky, FaStore } from "react-icons/fa6";

import ReviewForm from "./components/AddReviewProductForm";

const ProductDisplayPage = () => {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isPending } = useSelector((state) => state.auth);

  const [product, setProduct] = useState({});
  const isMounted = useRef(true);

  const fetchProduct = useCallback(async () => {
    if (!token) return;
    console.log("a");
    try {
      const resultAction = await dispatch(getProductIdAction(productId));
      if (
        getProductIdAction.fulfilled.match(resultAction) &&
        isMounted.current
      ) {
        setProduct(
          resultAction.payload?.data || resultAction.payload?.product || {}
        );
        console.log(resultAction.payload.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, productId, token]);

  useEffect(() => {
    isMounted.current = true;
    if (token) {
      fetchProduct();
    }
    return () => {
      isMounted.current = false;
    };
  }, [fetchProduct, token]);

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

  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmitReview = async (reviewData) => {
    console.log("Review submitted:", reviewData);
    
    const resultAction = await(dispatch(createReviewAction(reviewData)));

    if (createReviewAction.fulfilled.match(resultAction)) {
      console.log("subnmission success")   
    } else {
      console.log("Submission failed");
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        Loading...
      </div>
    );
  }

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
              {product?.productImage}
            </div>
          </div>

          <div
            className="grid md:grid-cols-2 grid-cols-1 items-center justify-center w-full bg-skin-colorContent
            text-skin-colorContent py-2 md:py-5 mt-1 text-stylep3 gap-2 rounded-lg
            font-medium md:px-4 px-3"
          >
            <span className="col-span-2">
              <h2 className="text-div-header">Product</h2>
              <div className="text-line w-full items-center justify-center" />
            </span>
            <span className="flex flex-row items-center gap-x-2">
              <span>Name: </span>
              <span>{product?.name}</span>
            </span>

            <span className="flex flex-row items-center gap-x-2">
              <span>Sku: </span>
              <span>{product?.sku}</span>
            </span>

            <span className="flex flex-row items-center gap-x-2">
              <span>Desc: </span>
              <span className="truncate">{product?.description}</span>
            </span>

            <span className="flex flex-row items-center gap-x-2 text-opacity-90">
              <span>Brand: </span>
              <span>{product?.brand}</span>
            </span>

            <span className="flex flex-row items-start gap-x-2 col-span-2">
              <div className="flex flex-col pl-2">
                <span>
                  <span>Price: </span>
                  {product?.price || ""}
                </span>
                <span>
                  <span>Stocks: </span>
                  {product?.stock || ""},
                </span>
              </div>
            </span>

            {product?.attributes &&
              Object.keys(product.attributes).length > 0 && (
                <div className="flex flex-col col-span-2 mt-2 border-t border-skin-colorBorder2 pt-2">
                  <span className="font-semibold text-skin-colorContent mb-1">
                    Attributes:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 text-stylep3">
                    {Object.entries(product.attributes).map(([key, value]) => (
                      <span key={key} className="flex flex-row gap-x-1">
                        <span className="font-medium capitalize">{key}:</span>
                        <span>{value}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
        <div className="text-div justify-between">
          <div
            className="grid sm:grid-cols-2 grid-cols-1 items-center justify-center w-full bg-skin-colorContent
            text-skin-colorContent p-2 mt-1 text-stylep3 gap-2 rounded-lg pb-3 md:pb-2"
          >
            <span
              className="flex flex-row items-center p-1 justify-center px-3 gap-2 bg-yellow-500 rounded-sm
              col-span-2"
            >
              <span>
                <FaCartShopping />
              </span>
              <span>Add to Cart</span>
            </span>
            <span className="col-span-2">
              <h2 className="text-div-header">Reviews</h2>
              <div className="text-line w-full items-center justify-center" />
            </span>
            <span
              onClick={() => setShowReviewForm(true)}
              className="flex flex-row items-center p-1 justify-center px-3 gap-2 bg-green-400 rounded-sm col-span-2 cursor-pointer hover:bg-green-500 transition"
            >
              <span>
                <FaNoteSticky />
              </span>
              <span>Leave A Review</span>
            </span>
          </div>
          <span className="flex w-full text-stylep2 text-skin-colorDis opacity-95 items-center justify-center">
            <Link className="underline flex flex-row items-center justify-center gap-2" to={`/product/${product?._id}`}><FaStore /> visit store</Link> 
          </span>
        </div>
        <div className="text-div">
          <div className="flex w-full flex-col items-start gap-4">

          </div>
        </div>
      </div>
      { showReviewForm && (
        <ReviewForm
          onClose={() => setShowReviewForm(false)}
          onSubmit={handleSubmitReview}
          productId={productId}
        />
      )}
      <div className="page-background"></div>
    </div>
  );
};

export default ProductDisplayPage;
