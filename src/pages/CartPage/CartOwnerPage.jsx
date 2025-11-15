import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartAction } from "../../store/actions/CartThunks";
import CartCardComponent from "../../components/Cards/CartCards";

const CartOwnerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isPending } = useSelector((state) => state.auth);

  const [cart, setCart] = useState({});

  const isMounted = useRef(true);

  const fetchCart = useCallback(async () => {
    if (!token) return;

    console.log("Aasdasd");

    try {
      const resultAction = await dispatch(getCartAction());
      if (getCartAction.fulfilled.match(resultAction) && isMounted.current) {
        setCart(resultAction.payload.data);
        console.log(resultAction.payload.data);
      }
    } catch (error) {
      console.log(error);
    }

    console.log(cart);
  }, [dispatch, token]);

  useEffect(() => {
    isMounted.current = true;
    if (token) {
      fetchCart();
    }
    return () => {
      isMounted.current = false;
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

  return (
    <div className="page-section">
      <div className="page-body">
        <div
          className="absolute opacity-5 inset-0 h-[90vw] w-full
         bg-gradient-to-r to-white from-transparent z-0"
        ></div>

        <div className="text-div-bgblur"></div>
        <div className="flex w-full h-[10px]"></div>
        <div className="text-div overflow-hidden relative">
          <span
            className="flex flex-col md:grid md:grid-cols-2 
          lg:grid-cols-3 text-stylep2
          w-full h-screen"
          >
            { !cart?.items ? 
            <CartCardComponent item={cart?.items} /> 
            : 
            <div>
              <span>No Cart Items</span>
              <button>refresh</button>
            </div>}
          </span>
        </div>
      </div>
      <div className="page-background"></div>
    </div>
  );
};

export default CartOwnerPage;
