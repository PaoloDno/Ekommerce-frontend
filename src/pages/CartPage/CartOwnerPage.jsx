import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartAction } from "../../store/actions/CartThunks";
import CartCardComponent from "../../components/Cards/CartCards";
import ShowOrderFormComponent from "./component/ShowOrderFormComponent";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowCircleRight } from "react-icons/fa";

const CartOwnerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isPending } = useSelector((state) => state.auth);
  const cartStateItems = useSelector((state) => state.cart.items) || [];
  const totalItems = cartStateItems.length;

  const totalSumsOfItems = cartStateItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  // i could use redux but my head spinning

  const [cartItems, setCartItems] = useState({});
  const isMounted = useRef(true);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!token) return;

    try {
      const resultAction = await dispatch(getCartAction());

      if (getCartAction.fulfilled.match(resultAction) && isMounted.current) {
        setCartItems(resultAction.payload?.cart);
        console.log("Cart: ", resultAction.payload.cart);
        return resultAction.payload.cart;
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, token]);

  useEffect(() => {
    isMounted.current = true;

    if (token) {
      fetchCart();
    }

    return () => {
      isMounted.current = false;
      console.log(cartItems);
    };
  }, [fetchCart, token]);

  if (!token) {
    return (
      <div className="page-body-background in-center">
        <div className="page-body-section in-center">
          <p className="text-white p-4">Please login to continue</p>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        Loading...
      </div>
    );
  }

  {
    return (
      <div className="page-body-background in-center">
        <div className="page-body-section in-center">
          <div className="flex flex-col w-full min-h-screen overflow-x-hidden relative py-2 px-1 space-y-2">
            <div
              className="text-stylep3 w-full grid grid-cols-2 justify-evenly min-h-[10vh] p-2 rounded-md 
                             bg-skin-colorContent text-skin-colorContent px-2"
            >
              <div className="flex flex-col w-full text-stylep4 justify-center items-start">
                <span>TOTAL PRICE:</span>
                <span className="text-styleh4">
                  ₱ {totalSumsOfItems.toFixed(2)}
                </span>
              </div>
              <div className="flex flex-row w-full justify-center items-center ">
                <button
                  className="flex flex-row rounded-lg items-center justify-center px-3 py-1 space-x-1 text-skin-color1 bg-skin-cart disabled:bg-skin-fill-5 disabled:text-skin-colorDis"
                  onClick={() => setShowOrderForm(true)}
                  disabled={totalSumsOfItems <= 0}
                >
                  <span>
                    {totalSumsOfItems <= 0 ? "Cart is empty" : "Go To Checkout"}
                  </span>
                  <FaArrowCircleRight />
                </button>
              </div>
            </div>
            <div className="flex flex-col text-stylep2 w-full h-[68vh] bg-skin-fill-2 lg:h-[68vh] py-2 px-2">
              {cartItems?.items && cartItems.items.length > 0 ? (
                <div className="flex flex-col overflow-x-hidden items-start 
                  justify-start overflow-y-auto min-h-full min-w-full
                  md:grid md:grid-cols-2 lg:grid-cols-3 gap-1 p-2">
                  {cartItems.items.map((cart, index) => (
                    <CartCardComponent
                      key={index}
                      item={cart}
                      fetchCart={fetchCart}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col w-full h-full in-center text-skin-colorContent">
                  <span>No Cart Items</span>
                  <button onClick={fetchCart}>refresh</button>
                </div>
              )}
            </div>
          </div>

          {showOrderForm && (
            <ShowOrderFormComponent
              onClose={() => setShowOrderForm(false)}
              onInitFetchCart={fetchCart}
              cartId={cartItems?._id}
              onSubmitOrder={() => navigate("/order")}
            />
          )}
        </div>
      </div>
    );
  }
};

export default CartOwnerPage;
