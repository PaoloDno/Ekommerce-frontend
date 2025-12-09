import React, { useState } from "react";
import ProductImages from "../ImagesComponent/components/ProductImageComponent";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCartAction, removeFromCartAction } from "../../store/actions/CartThunks";

const CartCardComponent = ({ item, fetchCart }) => {
  const { product, quantity } = item;
  const { _id, name, averageRating, price, productImage, stock } =
    product || {};

  const dispatch = useDispatch();

  const [prodQuantity, setProudctQuantity] = useState(quantity);
  const [clickRemove, setClickRemove] = useState(false);
  const [clickSave, setClickSave] = useState(false);

  const renderStars = (ratingValue) => {
    if (!ratingValue) return <p className="text-xs">No Rating Yet</p>;
    const rounded = Math.floor(ratingValue);
    return Array.from({ length: 5 }, (_, i) =>
      i < rounded ? (
        <FaStar key={i} className="text-yellow-400 text-sm" />
      ) : (
        <FaRegStar key={i} className="text-gray-400 text-sm" />
      )
    );
  };

  const handleSave = async () => {
    try {
      let resultAction = await dispatch(
        addToCartAction({ productId: _id, quantity: prodQuantity })
      );

      if (addToCartAction.fulfilled.match(resultAction)) {
        console.log("Cart updated.");

        
        if (fetchCart) fetchCart();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setClickSave(false);

    }
  };

  const handleRemove = async () => {
    try {
      let resultAction = await dispatch(removeFromCartAction(_id));
      if (removeFromCartAction.fulfilled.match(resultAction)) {
        console.log("product removed");

        
        if (fetchCart) fetchCart();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setClickRemove(false);
      dispatch(removeFromCartAction(_id));
    }
  };

  return (
    <div className="relative overflow-hidden">

      <div
        className="flex flex-col w-full justify-between
        bg-skin-primary bg-opacity-90 
        rounded-lg p-3 gap-3 shadow-sm h-[230px]"
      >
        <div className="flex gap-1">
          <Link
            to={`/product/${_id}`}
            className="w-24 h-24 rounded-md overflow-hidden"
          >
            <ProductImages productImages={productImage} />
          </Link>

          <div className="flex flex-col justify-between w-full">
            <span className="text-stylep3 font-medium">{name}</span>

            <div className="flex justify-between text-stylep3 mt-1">
              <span className="font-semibold">₱{price}</span>
              <span>Stocks: {stock}</span>
            </div>

            <div>
              <span className="text-stylep3 font-semibold">
                Rating: {averageRating || 0}
              </span>
              <div className="flex gap-1 mt-1">{renderStars(averageRating)}</div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-5 gap-2 text-stylep3 px-1 py-1">
          <button
            className="py-2 px-3 box-content flex items-center justify-center rounded bg-red-600 text-white"
            onClick={() => setClickRemove(true)}
          >
            Remove
          </button>

          {prodQuantity !== quantity ? (
            <button
              className="flex items-center justify-center p-1 bg-green-600 text-white"
              onClick={() => setClickSave(true)}
            >
              Save
            </button>
          ) : (
            <span />
          )}

          <button
            className="flex justify-center items-center py-2 rounded bg-skin-colorContent text-skin-colorContent"
            onClick={() =>
              setProudctQuantity((prev) => Math.max(prev - 1, 1))
            }
          >
            <FaMinus />
          </button>

          <div className="flex items-center justify-center font-semibold">
            QTY: {prodQuantity}
          </div>

          <button
            className="flex justify-center items-center py-2 rounded bg-skin-colorContent text-skin-colorContent"
            onClick={() => setProudctQuantity((prev) => prev + 1)}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      {clickRemove && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

          <div className="relative bg-white text-black p-5 rounded-lg w-64 shadow-lg animate-[fadeIn_0.2s_ease]">
            <span className="block text-center mb-3">
              Are you sure you want to remove this product?
            </span>

            <div className="flex flex-col gap-2">
              <button
                className="w-full bg-red-600 text-white py-2 rounded"
                onClick={handleRemove}
              >
                Remove
              </button>
              <button
                className="w-full bg-gray-300 py-2 rounded"
                onClick={() => setClickRemove(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {clickSave && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

          <div className="relative bg-white text-black p-5 rounded-lg w-64 shadow-lg animate-[fadeIn_0.2s_ease]">
            <span className="block text-center mb-3">Save changes?</span>

            <div className="flex flex-col gap-2">
              <button
                className="w-full bg-green-600 text-white py-2 rounded"
                onClick={handleSave}
              >
                Save Changes
              </button>
              <button
                className="w-full bg-gray-300 py-2 rounded"
                onClick={() => setClickSave(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CartCardComponent;
