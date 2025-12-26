import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartHeaderCard from "../Cards/CartHeaderCards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/* headerStyles.css */

const CartIconComponent = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // ---- GET CART FROM REDUX ----
  const cartItems = useSelector((state) => state.cart.items) || [];

  // ---- TOTALS ----
  const totalItems = cartItems.length;
  const totalSumsOfItems = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // ---- CLOSE WHEN CLICK OUTSIDE ----
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative header-component-call-to-action-buttons-cart-component in-center"
      ref={dropdownRef}
    >
      {/* CART ICON BUTTON */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="header-component-call-to-action-buttons-cart-icon in-center relative"
      >
        <FaShoppingCart className="text-stylep2 box-content p-1" />
        <span className="header-component-call-to-action-buttons-cart-number">
          {totalItems > 0 ? totalItems : "0"}
        </span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="header-dropdowns"
        >
          {/* ITEMS */}
          <div className="px-3 h-[320px] max-h-[320px] md:h-[245px] md:max-h-[245px] space-y-2 overflow-y-auto">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartHeaderCard key={item._id || item.id} item={item} />
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-6">
                Your cart is empty.
              </p>
            )}
          </div>

          {/* TOTAL + ACTIONS */}
          {cartItems.length > 0 && (
            <div className="flex flex-col w-full p-4 bg-skin-colorContent text-skin-colorContent rounded-lg 
              border border-skin-colorBorder1 shadow-lg bg-opacity-80 relative">
              <div className="absolute inset-0 w-full h-full bg-skin-colorContent bg-opacity-35 -z-10 blur-md"></div>
              <p className="flex justify-between font-semibold text-skin-colorContent ">
                <span>Total:</span>
                <span>₱{totalSumsOfItems.toFixed(2)}</span>
              </p>

              <div className="mt-3 flex gap-2">
                <button
                  className="flex-1 border-skin-colorBorder1 border-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-1.5 rounded-lg text-sm font-medium transition"
                  onClick={() => {
                    navigate("/cart-user");
                    setOpen(false);
                  }}
                >
                  View Cart
                </button>

                <button
                  className="flex-1 border-skin-colorBorder2 border-2 bg-black hover:bg-gray-800 text-white py-1.5 rounded-lg text-sm font-medium transition"
                >
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