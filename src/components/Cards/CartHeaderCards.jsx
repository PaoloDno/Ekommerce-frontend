import React from "react";
import { FaStar } from "react-icons/fa";
import ProductImages from "../ImagesComponent/components/ProductImageComponent";
import { useNavigate } from "react-router-dom";

const CartHeaderCard = ({item}) => {
  console.log("cart header item", item);
  const navigate = useNavigate();

  return (
    <div key={item._id} className="flex flex-col items-center justify-between my-2"
      onClick={()=>{ navigate(`/product/${item.product._id}`) }}
    >
      <div className="grid grid-cols-3 gap-2 space-x-2 bg-skin-primary text-skin-color1 rounded-xl overflow-hidden">
        <span className="flex items-center w-24 h-24 rounded-md overflow-hidden">
          <ProductImages productImages={item.product.productImages} />
        </span>
        <span className="flex flex-col col-span-2 px-2">
          <span className="flex flex-row text-stylep2 items-start font-medium truncate">
            {item.name}
          </span>
          <span  className="flex flex-row text-stylep2 gap-3 items-center justify-start">
            {item.product.averageRating} <FaStar />
          </span>
          <span className="flex flex-row text-stylep3 items-center justify-start">
            <span> PRICE: ₱ {item.price} </span>   
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
