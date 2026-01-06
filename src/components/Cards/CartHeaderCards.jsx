import React from "react";
import { FaStar } from "react-icons/fa";
import ProductImages from "../ImagesComponent/components/ProductImageComponent";
import { useNavigate } from "react-router-dom";

const CartHeaderCard = ({ item }) => {
  console.log("cart header item", item);
  const navigate = useNavigate();

  return (
    <div
      key={item._id}
      className="header-cart-card"
      onClick={() => {
        navigate(`/product/${item.product._id}`);
      }}
    >
      <div
        className="relative grid grid-cols-[1fr_0.75fr_2fr] gap-1 space-x-1 w-full h-full 
        text-skin-color1 bg-skin-primary rounded-none rounded-b-sm overflow-hidden in-center px-2 pl-0 justify-between my-2 border-skin-colorBorder1  border-r-2 border-b-2 border-opacity-40"
      >
        <div className="absolute w-full h-full bg-gradient-back-transparent blur-sm -z-20 opacity-15"></div>
        <div className="absolute w-full h-full bg-skin-primary bg-opacity-60 blur-sm -z-10 opacity-15"></div>
        <span className="flex items-center justify-center w-full h-full md:w-[80px] md:h-[80px] rounded-none overflow-hidden in-center">
          <ProductImages productImages={item.product.productImages} />
        </span>
        <span className="flex flex-col p-1 items-start justify-start h-full w-full">
          <span className="flex flex-row text-stylep3 items-start font-medium truncate">
            {item.name}
          </span>
          <span className="flex flex-row text-stylep3 gap-1 items-center justify-start">
            <FaStar /> {item.product.averageRating} 
          </span>
        </span>
        <span className="flex flex-col w-full h-full p-1 items-start justify-start">
          <span className="flex flex-row text-stylep3 items-center justify-start">
            <span>₱ {item.price} </span>
          </span>
          
          <span className="flex flex-row text-stylep3 items-center justify-start">
            <span> QTY: {item.quantity} </span>
          </span>
          
          <span className="flex flex-row text-stylep4 items-center justify-start">
            <span> TOTAL: {item.quantity * item.price} </span>
          </span>
          
        </span>
      </div>
    </div>
  );
};

export default CartHeaderCard;
