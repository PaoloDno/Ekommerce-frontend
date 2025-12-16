import { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrderAction } from "../../store/actions/OrderThunks";

/* =======================
   Reusable Accordion Item
======================= */
const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border p-3 mb-3 rounded-lg bg-white text-black w-full">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-between items-center cursor-pointer font-semibold"
      >
        <span>{title}</span>
        {isOpen ? <FaArrowUp /> : <FaArrowDown />}
      </div>

      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  );
};

/* =======================
   Section Placeholders
======================= */

const ShippingAddress = ({ profile }) => {
  const address = profile.address[0];
  console.log("address", address);
  return (
    <div className="text-sm">
      <div className="text-sm">
        <p>
          <strong>Name:</strong> {profile?.firstname} {profile?.lastname}
        </p>{" "}
        {/*make first index capital */}
        <p>
          <strong>Email:</strong> {profile?.email || "N/A"}
        </p>
      </div>
      <p>
        <strong>Shipping Address</strong>
      </p>
      <p>
        <strong>{address?.street}</strong>
      </p>
      <p>
        <strong>
          {address?.city} {address?.country} - {address?.postalCode}
        </strong>
      </p>
    </div>
  );
};

const ReceiptItemSumTotal = ({ items, totalPrice }) => {
  return (
    <div className="text-sm">
      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul className="mb-2">
            {items.map((item, index) => (
              <li key={index} className="grid grid-cols-3">
                <span>{item.name}</span>
                <span>
                  {item.price} x {item.quantity}
                </span>
                <span>= {item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <hr />
          <p className="mt-2 font-semibold">Total: {totalPrice}</p>
        </>
      )}
    </div>
  );
};

/* =======================
   Main Page
======================= */
const CreateOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { profile, token } = useSelector((state) => state.auth);
  console.log("CART", cart);
  console.log("PROFILE", profile);
  // Cart safety
  const { items = [], totalPrice = 0 } = cart || {};
  const address = profile.address[0];
  const [shippingFee, setShippingFee] = useState(30);
  const total = totalPrice + shippingFee;

  const isMounted = useRef(true);

  const OrderData = {
    shippingAddress: address,
    items,
    shippingFee,
    itemTotalPrice: totalPrice,
    totalSum: total,
  };
  console.log("Order Data: ", OrderData);

  console.log("Order Data: ", OrderData);
  console.log("Order Data: ", OrderData);
  /* =======================
     Auth Guard
  ======================= */
  useEffect(() => {
    if (!token) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [token, navigate]);

  if (!token) {
    return (
      <div className="p-6 text-center ">
        <h1 className="text-lg font-semibold">Authentication required</h1>
        <p className="text-sm text-gray-500">Redirecting to login…</p>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!token) return;

    try {
      const resultAction = await dispatch(createOrderAction(OrderData));

      if (createOrderAction.fulfilled.match(resultAction)) {
        console.log("ORDERED:", resultAction.payload);
        navigate("/cart-user");
      } else {
        console.log("WHYYYYYYYYYYYYYY");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-section">
      <div className="page-body max-w-3xl mx-auto">
        <div className="p-4">
          <AccordionItem title="Shipping Address">
            <ShippingAddress profile={profile} />
          </AccordionItem>

          <AccordionItem title="Receipt Items & Total">
            <ReceiptItemSumTotal items={items} totalPrice={totalPrice} />
          </AccordionItem>
        </div>

        <div className="flex justify-end p-4">
          <button
            className="bg-black text-white px-6 py-2 rounded-lg"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>

          <button
            className="bg-black text-white px-6 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrdersPage;
