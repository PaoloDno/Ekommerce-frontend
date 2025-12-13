import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrdersAction } from "../../store/actions/OrderThunks";

const UsersOrderPage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const resultAction = await dispatch(getUserOrdersAction());

      if (getUserOrdersAction.fulfilled.match(resultAction)) {
        setOrders(resultAction.payload || []);
        console.log("user-order", resultAction.payload);
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) fetchOrders();
  }, [fetchOrders, token]);

  const OrderCard = ({ order }) => (
    <div className="flex w-full h-[130px] p-4 border rounded">
      <h1>Order #{order._id}</h1>
    </div>
  );

  const OrderStatusBar = () => {
    const orderStatuses = [
      "pending",
      "paid",
      "shipped",
      "delivered",
      "canceled",
    ];

    return (
      <div className="flex gap-2">
        {orderStatuses.map((status) => (
          <button key={status} className="px-3 py-1 border rounded">
            {status}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <OrderStatusBar />

      <div className="mt-4 flex flex-col gap-3">
        {orders.length < 1 || !orders.length ? (
          <p>No orders found</p>
        ) : (
          orders.items.map((order) => <OrderCard key={order._id} order={order} />)
        )}
      </div>
    </div>
  );
};

export default UsersOrderPage;
