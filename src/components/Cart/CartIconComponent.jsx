import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartHeaderCard from "../Cards/CartHeaderCards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartIconComponent = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  // ---- GET CART FROM REDUX ----
  const cartItems = useSelector((state) => state.cart.items) || [];
  console.log("cartItems:", cartItems);
  // ---- TOTALS ----
  const totalItems = cartItems.length;

  const totalSumsOfItems = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // ---- CLOSE WHEN CLICK OUTSIDE ----
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          {totalItems > 0 ? totalItems : "0"}
        </span>
      </div>

      {showDropDown && (
        <div className="absolute -right-10 h-[420px] w-[300px] pt-6 -mt-3
         bg-white shadow-xl rounded-lg border border-gray-100 z-50 justify-between">
          <div className="p-3 max-h-64 overflow-y-auto">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartHeaderCard item={item} />
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-6">
                Your cart is empty.
              </p>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t p-3">
              <p className="flex justify-between font-semibold text-gray-800">
                <span>Total:</span>
                <span>₱{totalSumsOfItems.toFixed(2)}</span>
              </p>

              <div className="mt-3 flex gap-2">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-1.5 rounded-lg text-sm font-medium transition"
                  onClick={()=> navigate("/cart-user")}
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
