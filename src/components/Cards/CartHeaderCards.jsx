import React from "react";
import { FaStar } from "react-icons/fa";
import ProductImages from "../ImagesComponent/components/ProductImageComponent";
import { useNavigate } from "react-router-dom";

const CartHeaderCard = ({item}) => {
  console.log("cart header item", item);
  const navigate = useNavigate();

  return (
    <div key={item._id} className="header-cart-card"
      onClick={()=>{ navigate(`/product/${item.product._id}`) }}
    >
      <div className="relative grid grid-cols-[1fr_1fr_1.2fr] gap-1 space-x-2 w-full h-[75px] 
        text-skin-colorContent rounded-xl overflow-hidden in-center px-2 justify-between my-2  border border-black border-opacity-40">
        <div className="absolute w-full h-full bg-gradient-primary-buttons-95 blur-sm -z-20"></div>
        <div className="absolute w-full h-full bg-skin-colorContent bg-opacity-60 blur-sm -z-10"></div>
        <span className="flex items-center w-[56px] h-[56px] rounded-md overflow-hidden in-center py-1">
          <ProductImages productImages={item.product.productImages} />
        </span>
        <span className="flex flex-col px-2 ">
          <span className="flex flex-row text-stylep4 items-start font-medium truncate">
            {item.name}
          </span>
          <span  className="flex flex-row text-stylep4 gap-3 items-center justify-start">
            {item.product.averageRating} <FaStar/>
          </span>
        </span>
        <span className="flex flex-col px-2">
          <span className="flex flex-row text-stylep4 items-center justify-start">
            <span>₱ {item.price} </span>   
          </span>
          <span className="flex flex-row text-stylep4 items-center justify-start">
            <span> QTY: {item.quantity} </span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default CartHeaderCard;
