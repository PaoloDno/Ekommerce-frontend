import { FaArrowRight, FaArrowRightArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const OrderHomePageSectionComponent = ({ orders = [] }) => {
  const navigate = useNavigate();
  console.log("ORDER", orders);

  return (
    <div
      className="flex flex-col md:grid md:grid-cols-2 w-full min-h-[58vh] bg-skin-fill-1 p-2
     rounded-xl shadow-lg gap-2 text-stylep4 md:text-stylep3 text-skin-color1 px-3 font-Receipt"
    >
      {/* Header */}
      <div className="flex flex-col text-stylep1 bg-skin-colorContent text-skin-colorContent p-2 pb-5 rounded-lg">
        <h2 className="text-stylep2 font-bold">Store Orders</h2>
        <span className="text-stylep4 opacity-70 font-semibold">
          Manage incoming customer orders
        </span>

        <button
          className="w-[160px] bg-skin-cart text-skin-color1 py-1 px-2 rounded-lg"
          onClick={() => navigate(`/order-user`)}
        >
          Go To Orders
        </button>
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-2 h-[42vh] overflow-y-auto pr-1 border-2 border-skin-colorBorder1 rounded-lg">
        {orders.length === 0 ? (
          <div className="flex space-x-2 items-center justify-center h-full opacity-80">
            <span className="text-styleh4">No orders yet.</span>
            <span
              className="flex in-center text-stylep3 p-1 rounded-xl
            px-4 bg-skin-fill-3 text-skin-color3 gap-2"
              onClick={() => navigate("/products")}
            >
              Start Buying <FaArrowRight />
            </span>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="group rounded-lg border border-skin-border
                bg-skin-fill-1 px-3 py-2 text-stylep4
                transition-all hover:bg-skin-fill-3 hover:shadow-sm"
            >
              {/* Top Row */}
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-skin-colorHigh">
                  Order #{order._id.slice(-6)}
                </span>

                <span
                  className={`text-xs px-2 py-[2px] rounded-full capitalize
                    ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "processing"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }
                  `}
                >
                  {order.status}
                </span>
              </div>

              {/* Meta */}
              <div className="flex justify-between text-xs text-skin-color2">
                <span>{order.items.length} item(s)</span>
                <span>₱{order.totalSum}</span>
              </div>

              {/* Address */}
              <p className="text-xs mt-1 text-skin-color1 leading-snug line-clamp-2">
                {order.shippingAddress.street}, {order.shippingAddress.city}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-2">
                <span className="text-[11px] text-skin-color2">
                  {new Date(order.createdAt).toLocaleString()}
                </span>

                <button
                  onClick={() => navigate(`/seller/orders/${order._id}`)}
                  className="text-xs text-skin-accent font-medium
                    opacity-80 hover:opacity-100"
                >
                  View →
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHomePageSectionComponent;
