import React from "react";
import ProductImages from "../ImagesComponent/components/ProductImageComponent";
import { FaStar } from "react-icons/fa";

const CartCardComponent = (item) => {
  const content = "bg-skin-colorContent text-skin-colorContent";

  const { _id, name, averageRating, price, quantity, productImage} = item || {};


  return (
    <div key={_id} className="flex flex-col items-center justify-center">
      <div className="flex flex-row bg-skin-primary text-skin-color1">
        <span className="w-12 h-12 rounded-md">
          <ProductImages productImages={productImage || "A1"} />
        </span>
        <span className="flex flex-col">
          <span className="text-stylep3 font-medium truncate">
            {name}
          </span>
          <span className="grid grid-cols-3 items-center text-stylep3">
            <span>:{name}</span>
            <span>
              {averageRating} <FaStar />
            </span>
            <span>₱{price}</span>
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
        <span>QTY: {quantity}</span>
        <button className={`box-content flex items-center p-1 ${content}`}>
          +
        </button>
      </span>
    </div>
  );
};

export default CartCardComponent;
