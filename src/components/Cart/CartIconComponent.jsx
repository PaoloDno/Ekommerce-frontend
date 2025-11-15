import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartHeaderCard from "../Cards/CartHeaderCards";

const CartIconComponent = ({ cart }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalItems =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  const totalPrice =
    cart?.items?.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ) || 0;

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={() => setShowDropDown(true)}
      onMouseLeave={() => setShowDropDown(false)}
    >
      <div
        className="
          relative flex items-center justify-start py-1
          bg-skin-buttonColor-2 text-skin-color2 
          lg:text-skin-color1 lg:bg-transparent text-stylep2 
          lg:pr-2 lg:pl-0 font-bold p-2 bg-opacity-30
          font-Montserrat hover:text-skin-colorHigh hover:scale-110
          transition-all duration-200 ease-in-out
        "
      >
        <FaShoppingCart className="text-stylep1 box-content p-1" />
        <span
          className="
            absolute -right-1 -top-1
            bg-skin-colorContent text-skin-colorDis font-bold
            w-[18px] h-[18px] rounded-full
            text-[10px] flex items-center justify-center
          "
        >
          {totalItems > 0 ? totalItems : "!"}
        </span>
      </div>

      {showDropDown && (
        <div
          className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-lg border border-gray-100 z-50"
        >
          <div className="p-3 max-h-64 overflow-y-auto">
            {cart?.items?.length > 0 ? (
              cart.items.map((item) => (
                <CartHeaderCard key={item.product._id} item={item} />
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-6">
                Your cart is empty.
              </p>
            )}
          </div>

          {cart?.items?.length > 0 && (
            <div className="border-t p-3">
              <p className="flex justify-between font-semibold text-gray-800">
                <span>Total:</span> <span>₱{totalPrice.toFixed(2)}</span>
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-1.5 rounded-lg text-sm font-medium transition"
                >
                  View Cart
                </button>
                <button className="flex-1 bg-black hover:bg-gray-800 text-white py-1.5 rounded-lg text-sm font-medium transition">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartIconComponent;
