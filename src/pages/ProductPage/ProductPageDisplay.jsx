import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getProductIdAction } from "../../store/actions/ProductThunks";
import { createReviewAction } from "../../store/actions/ReviewThunks";

import {
  FaCartShopping,
  FaCircleExclamation,
  FaNoteSticky,
  FaStore,
  FaStar,
  FaRegStar,
} from "react-icons/fa6";

import ReviewForm from "./components/AddReviewProductForm";
import ProductGallery from "./components/ProductGalleryComponent";
import ProductReviewCardComponent from "./components/ProductReviewCard";
import AddCartForm from "./components/AddCartProductFrom";

const ProductDisplayPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isPending } = useSelector((state) => state.auth);

  const [product, setProduct] = useState({});
  const [displayImages, setDisplayImages] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAddCartForm, setShowAddCartForm] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;

  const currentReviews = product.reviews
    ? product.reviews.slice(
        currentPage * reviewsPerPage,
        currentPage * reviewsPerPage + reviewsPerPage
      )
    : [];

  const isMounted = useRef(true);

  const fetchProduct = useCallback(async () => {
    try {
      const resultAction = await dispatch(getProductIdAction(productId));

      if (getProductIdAction.fulfilled.match(resultAction) && isMounted.current) {
        const data =
          resultAction.payload?.data || resultAction.payload?.product || {};
        setProduct(data);

        const imagesArray = [data.productImage, ...(data.images || [])].filter(
          Boolean
        );
        setDisplayImages(imagesArray);
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, productId]);

  useEffect(() => {
    isMounted.current = true;
    if (token) fetchProduct();
    return () => {
      isMounted.current = false;
    };
  }, [fetchProduct, token]);

  const handleSubmitReview = async (reviewData) => {
    if (!token) {
      navigate("/login");
      return;
    }

    const resultAction = await dispatch(createReviewAction(reviewData));
    if (!createReviewAction.fulfilled.match(resultAction)) {
      console.log("Submission failed");
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center w-full h-full bg-gray-500 bg-opacity-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
      </div>
    );
  }

  const renderStars = (ratingValue) => {
    if (!ratingValue) return <p>No Rating Yet</p>;
    const roundedRating = Math.floor(ratingValue);
    return Array.from({ length: 5 }, (_, i) =>
      i + 1 <= roundedRating ? (
        <FaStar key={i} className="text-yellow-400" />
      ) : (
        <FaRegStar key={i} className="text-gray-300" />
      )
    );
  };

  return (
    <div className="page-body-background in-center">
      <div className="page-body-section in-center pb-4">

        {/* HERO ROW */}
        <div className="flex w-full h-[52vh] md:h-[65vh] lg:h-[75vh] px-2 gap-3">

          {/* GALLERY */}
          <div className="w-[50%] md:w-[33.333%] h-full">
            <ProductGallery
              images={displayImages.length ? displayImages : ["A1", "B1", "C1"]}
            />
          </div>

          {/* DESKTOP ACTIONS + REVIEWS */}
          <div className="hidden md:flex flex-col w-[33.333%] h-full gap-2">
            <div className="grid gap-2 bg-skin-colorContent p-2 rounded-lg text-skin-color1">
              <button
                onClick={() => setShowAddCartForm(true)}
                className="flex items-center justify-start px-2 gap-2 bg-skin-cart text-skin-color1 py-2 rounded-sm md:rounded-lg lg:text-styleh3"
              >
                <FaCartShopping /> Add to Cart
              </button>

              <button
                onClick={() => setShowReviewForm(true)}
                className="flex items-center justify-start px-2 gap-2 bg-skin-buttonColor-2 rounded-lg"
              >
                <FaNoteSticky /> Leave A Review
              </button>

              <Link
                to={`/store/${product?.seller?._id}`}
                className="flex items-center justify-start px-2 gap-2 bg-skin-buttonColor-1 bg-opacity-95 rounded-lg py-1"
              >
                <FaStore /> Visit Store
              </Link>

              <Link
                to={`/store/${product?.seller?._id}`}
                className="flex items-center justify-center gap-2 bg-skin-red text-skin-color1 rounded-lg py-1"
              >
                <FaCircleExclamation /> Report
              </Link>
            </div>

            {/* DESKTOP REVIEWS */}
            <div className="flex flex-col h-full bg-skin-primary text-skin-color1 px-2 py-2 rounded-lg">
              <h2 className="text-styleh4 mb-2">Reviews - {product?.averageRating} <span className="opacity-65">{"("}{product?.numOfReviews}{")"}</span></h2>
              <div className="flex flex-col gap-1 overflow-y-auto h-full">
                {currentReviews.length ? (
                  currentReviews.map((review) => (
                    <ProductReviewCardComponent
                      key={review._id}
                      reviewId={review._id}
                      comment={review.comment}
                      rating={review.rating}
                      user={review.user}
                    />
                  ))
                ) : (
                  <p className="opacity-70 text-sm">No reviews yet.</p>
                )}
              </div>
            </div>

          </div>

            {/* INFO */}
          <div className="w-[50%] md:w-[33.333%] h-full grid grid-cols-2 gap-0 bg-skin-colorContent text-start items-start justify-start
             text-skin-colorContent font-Receipt px-2 py-2 rounded-lg overflow-y-auto text-stylep3">
            <div className="col-span-2">
              <h2 className="text-styleh3 px-2 py-1 bg-skin-fill-4 text-skin-colorHigh">
                Price: ₱ {product?.price}
              </h2>
              <div className="border-b w-full" />
            </div>

            <div className="col-span-2">P.Name: {product?.name}</div>
            <div>SKU: {product?.sku}</div>
            <div >Brand: {product?.brand}</div>
            <div className="col-span-2 flex items-center gap-1">
              Rating: {renderStars(product?.averageRating)}
            </div>
            <div className="col-span-2">Stocks: {product?.stock}</div>
            <div className="col-span-2">
              Description:
              <p className="opacity-80 line-clamp-3">{product?.description}</p>
            </div>

            {product?.attributes && (
              <div className="col-span-2 mt-2 border-t pt-2">
                <span className="font-semibold">Attributes:</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium capitalize">{key}:</span>{" "}
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="md:hidden w-full mt-3 grid grid-cols-2 gap-2 bg-skin-colorContent text-skin-colorContent p-2 rounded-lg">
          <button
            onClick={() => setShowAddCartForm(true)}
            className="flex items-center justify-center gap-2 text-skin-color1 bg-skin-green py-1 rounded-sm"
          >
            <FaCartShopping /> Add to Cart
          </button>

          <button
            onClick={() => setShowReviewForm(true)}
            className="flex items-center justify-center gap-2 text-skin-color2 bg-skin-buttonColor-2 py-1 rounded-sm"
          >
            <FaNoteSticky /> Review
          </button>

          <Link
            to={`/store/${product?.seller?._id}`}
            className="flex items-center justify-center gap-2 text-skin-color1 bg-skin-buttonColor-2 py-1 rounded-sm"
          >
            <FaStore /> Store
          </Link>

          <Link
            to={`/store/${product?.seller?._id}`}
            className="flex items-center justify-center gap-2 text-skin-color1 bg-skin-red py-1 rounded-sm"
          >
            <FaCircleExclamation /> Report
          </Link>
        </div>

        {/* MOBILE REVIEWS */}
        <div className="md:hidden w-full mt-3 bg-skin-primary text-skin-color1 p-2 rounded-lg">
          <h2 className="text-styleh4 mb-2">Reviews - {product?.averageRating}</h2>
          <div className="flex flex-col gap-1 max-h-[26vh] overflow-y-auto">
            {currentReviews.length ? (
              currentReviews.map((review) => (
                <ProductReviewCardComponent
                  key={review._id}
                  reviewId={review._id}
                  comment={review.comment}
                  rating={review.rating}
                  user={review.user}
                />
              ))
            ) : (
              <p className="opacity-70 text-sm">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>

      {showReviewForm && (
        <ReviewForm
          onClose={() => setShowReviewForm(false)}
          onSubmit={handleSubmitReview}
          productId={productId}
        />
      )}

      {showAddCartForm && (
        <AddCartForm
          onClose={() => setShowAddCartForm(false)}
          product={product}
        />
      )}
    </div>
  );
};

export default ProductDisplayPage;