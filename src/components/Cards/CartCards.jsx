import React, { useState } from "react";
import ProductImages from "../ImagesComponent/components/ProductImageComponent";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import {
  addToCartAction,
  removeFromCartAction,
} from "../../store/actions/CartThunks";

const CartCardComponent = ({ item, fetchCart }) => {
  const { product, quantity } = item;
  const { _id, name, averageRating, price, productImage, stock } =
    product || {};

  const dispatch = useDispatch();

  const [prodQuantity, setProudctQuantity] = useState(quantity);
  const [clickRemove, setClickRemove] = useState(false);
  const [clickSave, setClickSave] = useState(false);

  const renderStars = (ratingValue) => {
    if (!ratingValue) return <p className="text-stylep3">No Rating Yet</p>;
    const rounded = Math.floor(ratingValue);
    return Array.from({ length: 5 }, (_, i) =>
      i < rounded ? (
        <FaStar
          key={i}
          className="text-yellow-500 text-stylep2 md:text-stylep1 border border-black border-opacity-10"
        />
      ) : (
        <FaRegStar
          key={i}
          className="text-gray-400 text-stylep2 border-black border border-opacity-10"
        />
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
    <div className="w-full h-[23vh] min-h-[23vh] flex-col shadow-lg rounded-md relative overflow-hidden bg-skin-colorContent text-skin-colorContent p-1">
      <div className="flex flex-row w-full h-[15vh] min-h-[15vh] space-x-2 px-2 py-1 bg-skin-colorContent text-skin-colorContent">
        <Link
          to={`/product/${_id}`}
          className="flex flex-col w-[18vh] h-[13vh] overflow-hidden in-center border-2 border-skin-colorBorder1"
        >
          <ProductImages productImages={productImage} />
        </Link>

        <div className="flex flex-col text-stylep4 space-y-0 justify-start items-start w-full h-full font-display">
          
          
          <div className="flex justify-between w-full">
          <span className="font-medium">Product Name:</span>
          <span>{name}</span>
          </div>
          <div className="flex justify-between w-full">
            <span className="font-semibold font-Receipt">
              ₱ {price}
            </span>
            <span>Stocks: {stock}</span>
          </div>
          <div className="flex justify-between text-stylep4 mt-1 w-full">
            <span className="font-semibold">Rating: {averageRating || 0}</span>
            <div className="flex flex-row gap-1 mt-1">
              {renderStars(averageRating)}
            </div>
          </div>
        </div>
      </div>
      {/* BOTTOM ROW */}
      <div className="grid rounded-lg grid-cols-5 gap-1 text-stylep4 items-center justify-center bg-skin-secondary px-3 py-1 w-full h-[7vh]">
        <button
          className="flex flex-row px-3 w-full h-[5vh] in-center rounded bg-skin-red text-skin-color1"
          onClick={() => setClickRemove(true)}
        >
          Remove
        </button>

        {prodQuantity !== quantity ? (
          <button
            className="flex flex-row px-3 w-full h-[5vh] in-center rounded bg-skin-green text-skin-color1"
            onClick={() => setClickSave(true)}
          >
            Save
          </button>
        ) : (
          <span />
        )}

        <button
          className="flex flex-row px-3 w-full h-[5vh] in-center rounded bg-skin-buttonColor-1 text-skin-color1"
          onClick={() => setProudctQuantity((prev) => Math.max(prev - 1, 1))}
        >
          <FaMinus />
        </button>

        <div className="flex items-center justify-center font-semibold font-Receipt text-stylep3">
          QTY: {prodQuantity}
        </div>

        <button
          className="flex flex-row px-3 w-full h-[5vh] in-center rounded bg-skin-buttonColor-1 text-skin-color1"
          onClick={() => setProudctQuantity((prev) => prev + 1)}
        >
          <FaPlus />
        </button>
      </div>
      {clickRemove && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

          <div className="relative bg-skin-secondary text-stylep4 font-display text-skin-color1 p-2 rounded-lg w-[250px] shadow-lg animate-[fadeIn_0.2s_ease]">
            <span className="block text-center mb-2">
              Are you sure you want to remove this product?
            </span>

            <div className="flex flex-col gap-1 w-full in-center">
              <button
                className="flex in-center bg-skin-red text-skin-color1 py-1 px-3 rounded-lg w-[160px]"
                onClick={handleRemove}
              >
                Remove
              </button>
              <button
                className="flex in-center bg-skin-fill-5 text-skin-colorDis py-1 px-3 rounded-lg w-[160px]"
                onClick={() => setClickRemove(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {clickSave && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

          <div className="relative bg-skin-secondary text-stylep4 font-display text-skin-color1 p-2 rounded-lg w-[250px] shadow-lg animate-[fadeIn_0.2s_ease]">
            <span className="block text-center mb-2">Save changes?</span>

            <div className="flex flex-col gap-1 w-full in-center">
              <button
                className="flex in-center bg-skin-green text-skin-color1 py-1 px-3 rounded-lg w-[160px]"
                onClick={handleSave}
              >
                Save Changes
              </button>
              <button
                className="flex in-center bg-skin-fill-5 text-skin-colorDis py-1 px-3 rounded-lg w-[160px]"
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
