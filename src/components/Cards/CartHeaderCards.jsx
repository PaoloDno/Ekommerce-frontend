import React from "react";
import ProductImages from "../ImagesComponent/components/ProductImageComponent";
import { FaStar } from "react-icons/fa";

const CartHeaderCard = (item) => {
  const content = "bg-skin-colorContent text-skin-colorContent";

  return (
    <div key={item._id} className="flex flex-col items-center justify-between">
      <div className="flex flex-row bg-skin-primary text-skin-color1">
        <span className="w-12 h-12 rounded-md">
          <ProductImages productImages={item.product.productImages} />
        </span>
        <span className="flex flex-col">
          <span className="text-stylep3 font-medium truncate">
            {item.product.name}
          </span>
          <span className="grid grid-cols-3 items-center text-stylep3">
            <span>:{item.product.name}</span>
            <span>
              {item.product.averageRating} <FaStar />
            </span>
            <span>₱{item.product.price}</span>
          </span>
        </span>
      </div>
      <span className="grid grid-cols-4 items-center justify-center text-stylep2">
        <button
          className={`box-content flex items-center py-1 px-2 ${content}`}
        >
          Remove Item
        </button>
        <button className={`box-content flex items-center p-1 ${content}`}>
          -
        </button>
        <span>QTY: {item.product.quantity}</span>
        <button className={`box-content flex items-center p-1 ${content}`}>
          +
        </button>
      </span>
    </div>
  );
};

export default CartHeaderCard;
