import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaClock, FaProcedures, FaTimes, FaTruck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { fetchUserOrdersAction } from "../../store/actions/OrderThunks";


const UsersOrderPage = () => {

  // to be refactored
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((s) => s.auth);

  const { userOrders, orders} = useSelector((s) => s.order);
  const [statusCount, setStatusCount] = useState({});
  const [activeStatus, setActiveStatus] = useState("all");

  const isMounted = useRef(true);

  const fetchUsersOrders = useCallback( async () => {
    try {
      const resultAction = await dispatch(fetchUserOrdersAction());
      if (fetchUserOrdersAction.fulfilled.match(resultAction) && isMounted.current) {
        console.log("result action", resultAction.payload);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("userOrders", userOrders);
    }
  }, [dispatch]);

  useEffect(() => {
    isMounted.current = true;

    if(token) fetchUsersOrders();

    return () => {
      isMounted.current = false;
    }
  }, [fetchUsersOrders, token])

  const OrderCard = ({ order }) => (
    <div onClick={() => navigate(`/orderId/${order._id}`)} 
    className="flex w-full py-2 px-2 pb-3 border rounded shadow-sm bg-skin-colorContent text-skin-colorContent">
      <div className="flex flex-col">
        <h1 className="font-semibold">Order #{order._id}</h1>
        <p className="text-stylep3 capitalize">Status: {order.status}</p>
        <p className="text-stylep4">Total: ₱{order.totalSum}</p>
      </div>
    </div>
  );

  const OrderStatusBar = ({ counts }) => {
    const statuses = [
      { key: "pending", icon: <FaClock />, label: "Pending", count: counts?.pending || 0 },
      { key: "processing", icon: <FaProcedures />, label: "Processing", count: counts?.processing || 0 },
      { key: "shipped", icon: <FaTruck />, label: "Shipped", count: counts?.shipped || 0 },
      { key: "delivered", icon: <FaCheck />, label: "Delivered", count: counts?.delivered || 0 },
      { key: "cancelled", icon: <FaTimes />, label: "Canceled", count: counts?.cancelled || 0 },
      { key: "refunded", icon: <FaXmark />, label: "Refunded", count: counts?.refunded || 0 },
    ];

    return (
      <div className="grid grid-cols-4 gap-2 py-2 px-2 w-full text-skin-color1">
        {statuses.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveStatus(s.key)}
            className={`relative flex flex-col items-center justify-center px-3 py-2
              bg-skin-buttonColor-1 border-2 border-skin-colorBorder1
              border-opacity-15 shadow-md rounded transition
              ${activeStatus === s.key ? "bg-skin-fill-1 text-skin-accent" : ""}`}
          >
            <span>{s.icon}</span>
            <span className="capitalize text-stylep4">{s.label}</span>

            {s.count > 0 && (
              <span className="absolute -top-2 -right-2 bg-skin-red font-bold
                w-[22px] h-[22px] rounded-full flex items-center justify-center text-stylep4">
                {s.count}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  };

  const filteredOrders =
    activeStatus === "all"
      ? orders
      : orders.filter((o) => o.status === activeStatus);

  return (
    <div className="page-body-background in-center relative">
      <div className="page-body-section items-start justify-start z-20">
        <div className="flex flex-col w-full px-2">

          <OrderStatusBar counts={statusCount} />

          <div className="mt-6 flex flex-col gap-3 h-[50vh] overflow-x-hidden overflow-y-auto">
            {filteredOrders.length === 0 ? (
              <p className="text-center text-skin-color2">No orders found</p>
            ) : (
              filteredOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default UsersOrderPage;