import { useEffect, useState } from "react";
import {
  FaAddressBook,
  FaArrowDown,
  FaArrowUp,
  FaCoins,
  FaEnvelope,
  FaMobile,
  FaMoneyBill,
  FaPaypal,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrderAction } from "../../store/actions/OrderThunks";

{
  /** reusable accordion */
}
const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border px-3 py-1 mb-3 rounded-lg  w-full bg-slate-300/90 font-Receipt text-black relative z-10">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex justify-between items-center cursor-pointer font-semibold z-20"
      >
        <span>{title}</span>
        {isOpen ? <FaArrowUp /> : <FaArrowDown />}
      </div>
      {isOpen && <div className="mt-3 z-20">{children}</div>}
      <div className="absolute flex bottom-0 right-0 bg-skin-colorContent/15 blur-lg w-full h-[50%] z-0"></div>
    </div>
  );
};

{
  /*** sections */
}
const ShippingAddress = ({ profile }) => {
  const address = profile?.address?.[0];

  return (
    <div className="flex flex-col w-full min-h-[20vh] text-stylep3 pb-4">
      <p className="flex flex-row items-center justify-start mt-2 font-semibold gap-2">
        <FaUser size={14} /> <strong>Name:</strong> {profile?.firstname}{" "}
        {profile?.lastname}
      </p>
      <p className="flex flex-row items-center justify-start mt-2 font-semibold gap-2">
        <FaEnvelope size={14} /> <strong>Email:</strong>{" "}
        {profile?.email || "N/A"}
      </p>

      <p className="flex flex-row items-center justify-start mt-2 font-semibold gap-2">
        <FaAddressBook size={14} /> Shipping Address :
      </p>
      <p>{address?.street}</p>
      <p>
        {address?.city}, {address?.country} - {address?.postalCode}
      </p>
      <p className="flex flex-row items-center justify-start mt-2 font-semibold gap-2">
        <FaPhone size={14} /> Phone Number: {address?.phoneNumber}
      </p>
    </div>
  );
};

const ReceiptItemSumTotal = ({ items = [], totalPrice = 0 }) => {
  if (!items.length) return <p className="text-sm">No items in cart</p>;

  return (
    <div className="flex flex-col w-full min-h-[24vh] text-stylep3 pb-4">
      <ul className="flex flex-col mb-2 space-y-1 overflow-hidden overflow-y-auto h-[18vh]">
        {items.map((item) => (
          <li key={item._id} className="grid grid-cols-3 gap-2">
            <span>{item.name}</span>
            <span>
              {item.price} × {item.quantity}
            </span>
            <span>= {item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <hr />
      <p className="text-styleh4 font-semibold mt-auto h-[6vh]">
        Total: {totalPrice}
      </p>
    </div>
  );
};

const PaymentRadio = ({ label, value, selected, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer select-none">
    <input
      type="radio"
      name="payment"
      value={value}
      checked={selected === value}
      onChange={() => onChange(value)}
      className="hidden"
    />

    <div
      className={`
      w-5 h-5 rounded-full border-2 flex items-center justify-center
      transition-all duration-200 text-skin-color1
      ${selected === value ? "border-green-500" : "border-gray-400"}
    `}
    >
      {selected === value && (
        <div className="w-2.5 h-2.5 bg-skin-green rounded-full" />
      )}
    </div>

    <span className="text-stylep3">{label}</span>
  </label>
);
// they say its normal for radio to cause rerender

const SelectCourierInput = ({ value, onChange }) => (
  <div className="flex flex-row items-center justify-center gap-2 p-2">
    <label className="text-stylep3">Select Courier</label>
    <select
      name="courier"
      value={value}
      className="flex items-center justify-start text-stylep3 px-2 py-1 rounded-md min-w-[150px] bg-skin-cart"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="LBC">LBC Express</option>
      <option value="JRS">JRS Express</option>
      <option value="GRAB">Grab Driver</option>
      <option value="LALA">Lalamove</option>
    </select>
  </div>
);

//Main Page

const CreateOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, profile } = useSelector((state) => state.auth);
  const { items = [], totalPrice = 0 } = useSelector((state) => state.cart);
  console.log("createORDER", items);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [courier, setCourier] = useState("local");

  {
    /**
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: String,
        image: String, product?.productImage
        price: Number,
        quantity: Number,
        variant: String,

        sellerStatus: {
          type: String,
          enum: ["pending", "processing", "shipped", "delivered", "cancelled", "refunded"],
          default: "pending",
        },

        courier: String,
        trackingNumber: String,
        shippedAt: Date,
        deliveredAt: Date,
      },
    ],


    shippingAddress: {
      street: String,
      city: String,
      country: String,
      postalCode: String,
      phone: String,
    },

    pricing: {
      itemsTotal: { type: Number, required: true },
      shippingFee: { type: Number, default: 0 },
      total: { type: Number, required: true },
    },

    payment: {
      method: { type: String, enum: ["cod", "gcash", "paypal"], default: "cod" },
      isPaid: { type: Boolean, default: false },
      paidAt: Date,
      transactionId: String,
    },

    shipping: {
      courier: String,
      trackingNumber: String,
      shippedAt: Date,
      deliveredAt: Date,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true }
    */
  }
  console.log("createORDER-PROFILE", profile);
  console.log("method", paymentMethod);
  const shippingFee = 30;
  const address = profile?.address?.[0];
  const totalSum = totalPrice + shippingFee;

  const orderData = {
    shippingAddress: address,
    items,
    shippingFee,
    itemTotalPrice: totalPrice,
    totalSum,
  };

  useEffect(() => {
    if (!token) {
      const timer = setTimeout(() => navigate("/login"), 1500);
      return () => clearTimeout(timer);
    }
  }, [token, navigate]);

  if (!token) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-lg font-semibold">Authentication required</h1>
        <p className="text-sm text-gray-500">Redirecting to login…</p>
      </div>
    );
  }

  const handleSubmit = async () => {
    try {
      const result = await dispatch(
        createOrderAction({ ...orderData, paymentMethod, courier }),
      );
      if (createOrderAction.fulfilled.match(result)) {
        navigate("/cart-user");
      }
    } catch (err) {
      console.error("Order creation failed:", err);
    }
  };

  return (
    <div className="page-body-background in-center">
      <div className="page-body-section items-start justify-start relative px-2">
        <span
          className="w-full flex flex-col items-start object-start text-styleh4 text-skin-color1 
          py-2 px-1 font-semibold text-center mb-3"
        >
          <h2>SUBMIT ORDER REQUEST</h2>
        </span>
        <div
          className="flex flex-col md:flex-row gap-2 md:justify-between min-h-[10vh] p-2 my-2 rounded-2xl overflow-x-hidden overflow-y-auto w-full
          bg-skin-primary text-skin-color1 items-start justify-start md:items-center
        "
        >
          <h2 className="text-stylep1 font-bold font-display my-2">
            Method of Payment
          </h2>
          <div className="flex flex-col lg:flex-row gap-3">
            <PaymentRadio
              label="Cash on Delivery"
              value="cod"
              selected={paymentMethod}
              onChange={setPaymentMethod}
            />

            <PaymentRadio
              label="GCash"
              value="gcash"
              selected={paymentMethod}
              onChange={setPaymentMethod}
            />

            <PaymentRadio
              label="PayPal"
              value="paypal"
              selected={paymentMethod}
              onChange={setPaymentMethod}
            />
          </div>

          <SelectCourierInput onChange={setCourier} />
        </div>

        <div className="flex flex-col h-[60vh] overflow-hidden overflow-y-auto w-full">
          <AccordionItem title="Shipping Address">
            <ShippingAddress profile={profile} />
          </AccordionItem>

          <AccordionItem title="Receipt Items & Total">
            <ReceiptItemSumTotal items={items} totalPrice={totalPrice} />
          </AccordionItem>
        </div>
        <div className="flex flex-row w-full in-center px-2 gap-2 mt-2">
          <button
            className="bg-skin-red text-skin-color1 text-stylep3 px-2 py-2 rounded-lg min-w-[110px]"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
          <button
            className="bg-skin-green text-skin-color1 text-stylep3 px-2 py-2 rounded-lg min-w-[110px]"
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
