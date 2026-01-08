import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import ProductImages from "../ImagesComponent/components/ProductImageComponent";
import { useNavigate } from "react-router-dom";

const CartHeaderCard = ({ item }) => {
  console.log("cart header item", item);
  const navigate = useNavigate();

  const renderStars = (ratingValue) => {
    if (!ratingValue)
      return (
        <p className="flex flex-row items-center text-stylep3 py-2">
          No Rating Yet
        </p>
      );
    const rounded = Math.floor(ratingValue);
    return Array.from({ length: 5 }, (_, i) =>
      i < rounded ? (
        <FaStar
          key={i}
          className="text-yellow-500 text-stylep3 border border-black border-opacity-10"
        />
      ) : (
        <FaRegStar
          key={i}
          className="text-gray-400 text-stylep3 border-black border border-opacity-10"
        />
      )
    );
  };

  return (
    <div
      key={item._id}
      className="header-cart-card"
      onClick={() => {
        navigate(`/product/${item.product._id}`);
        onClose();
      }}
    >
      <div
        className="relative flex flex-row gap-1 space-x-1 w-full h-full rounded-lg
        text-skin-colorContent bg-skin-colorContent rounded-b-sm overflow-hidden in-center px-2 pl-0 justify-between my-2 border-skin-colorBorder1  
        border-r-2 border-b-2 border-opacity-40"
      >
        <div className="absolute w-full h-full bg-gradient-back-transparent blur-sm -z-20 opacity-15"></div>
        <div className="absolute w-full h-full bg-skin-primary bg-opacity-60 blur-sm -z-10 opacity-15"></div>
        <span className="flex items-center justify-center w-1/3 h-full md:w-[80px] md:h-[80px] rounded-none overflow-hidden in-center">
          <ProductImages productImages={item.product.productImages} />
        </span>
        <span className="flex flex-col p-1 items-start justify-start h-full w-1/3">
          <span className="flex flex-row w-full text-stylep3 items-start font-medium truncate">
            {item.name}
          </span>

          <span className="flex flex-row text-stylep3 items-center justify-start">
            <span>₱ {item.price} </span>
          </span>

          <span className="flex flex-row text-stylep4 items-center justify-start">
            <span> TOTAL: {item.quantity * item.price} </span>
          </span>
        </span>
        <span className="flex flex-col w-1/3 h-full p-1 items-start justify-start">
          <span className="flex flex-row text-stylep3 py-1 gap-1 items-center justify-start">
            {renderStars(item.product.averageRating)}
          </span>

          <span className="flex flex-row text-stylep3 items-center justify-start">
            <span> QTY: {item.quantity} </span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default CartHeaderCard;
