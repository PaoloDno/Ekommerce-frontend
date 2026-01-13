import { useEffect, useState } from "react";
import { FaAddressBook, FaArrowDown, FaArrowUp, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrderAction } from "../../store/actions/OrderThunks";

{
  /** reusable accordion */
}
const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border px-3 py-1 mb-3 rounded-lg  w-full bg-slate-300 font-Receipt text-black">
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

{
  /*** sections */
}
const ShippingAddress = ({ profile }) => {
  const address = profile?.address?.[0];

  return (
    <div className="flex flex-col w-full min-h-[20vh] text-stylep3 pb-4">
      <p className="flex flex-row items-center justify-start mt-2 font-semibold gap-2">
        <FaUser size={14} /> <strong>Name:</strong> {profile?.firstname} {profile?.lastname}
      </p>
      <p className="flex flex-row items-center justify-start mt-2 font-semibold gap-2">
        <FaEnvelope size={14} /> <strong>Email:</strong> {profile?.email || "N/A"}
      </p>

      <p className="flex flex-row items-center justify-start mt-2 font-semibold gap-2"><FaAddressBook size={14} /> Shipping Address :</p>
      <p>{address?.street}</p>
      <p>
        {address?.city}, {address?.country} - {address?.postalCode}
      </p>
      <p className="flex flex-row items-center justify-start mt-2 font-semibold gap-2">
        <FaPhone size={14}/> Phone Number: {address?.phoneNumber}
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
      <p className="text-styleh4 font-semibold mt-auto h-[6vh]">Total: {totalPrice}</p>
    </div>
  );
};

/* =======================
   Main Page
======================= */
const CreateOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, profile } = useSelector((state) => state.auth);
  const { items = [], totalPrice = 0 } = useSelector((state) => state.cart);
  console.log("createORDER", items);

  {/**
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
    */}
  console.log("createORDER-PROFILE", profile);
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
      const result = await dispatch(createOrderAction(orderData));
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
        <span className="w-full flex flex-col items-start object-start text-styleh4 text-skin-color1 
          py-2 px-1 font-semibold text-center mb-3">
          <h2>SUBMIT ORDER REQUEST</h2>
        </span>
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
