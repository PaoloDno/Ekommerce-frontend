import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartAction } from "../../store/actions/CartThunks";
import CartCardComponent from "../../components/Cards/CartCards";
import ShowOrderFormComponent from "./component/ShowOrderFormComponent";

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
      <div className="page-section">
        <div className="page-body">
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
      <div className="page-section">
        <div className="page-body">
          <div className="absolute opacity-5 inset-0 h-[90vw] w-full bg-gradient-to-r to-white from-transparent z-0"></div>

          <div className="text-div-bgblur"></div>
          <div className="flex w-full h-[10px]"></div>

          <div className="text-div overflow-hidden relative py-4">
            <div
              className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-2
                          text-stylep2 w-full py-2 px-1"
            >
              <div
                className="grid grid-cols-1 md:grid-cols-2 
                            justify-start items-start w-full gap-2"
              >
                {cartItems?.items && cartItems.items.length > 0 ? (
                  cartItems.items.map((cart, index) => (
                    <CartCardComponent
                      key={index}
                      item={cart}
                      fetchCart={fetchCart}
                    />
                  ))
                ) : (
                  <div>
                    <span>No Cart Items</span>
                    <button onClick={fetchCart}>refresh</button>
                  </div>
                )}
              </div>

              <div
                className="w-full grid grid-cols-2 justify-evenly min-h-[100px] p-2 rounded-md 
                             bg-skin-colorContent text-skin-colorContent"
              >
                <div className="flex flex-col w-full text-stylep1 justify-center items-center">
                  <span>TOTAL PRICE:</span>
                  <span>₱ {totalSumsOfItems.toFixed(2)}</span>
                </div>
                <div className="flex w-full justify-center items-center">
                  <button
                    className="bg-green-500 p-2 text-white rounded-lg disabled:bg-gray-500"
                    onClick={() => setShowOrderForm(true)}
                    disabled={totalSumsOfItems <= 0}
                  >
                    {totalSumsOfItems <= 0 ? "Cart is empty" : "Go To Checkout"}
                  </button>
                </div>
              </div>
            </div>
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

        <div className="page-background"></div>
      </div>
    );
  }
};

export default CartOwnerPage;
