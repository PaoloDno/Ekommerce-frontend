import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCheck,
  FaClock,
  FaProcedures,
  FaTimes,
  FaTruck,
} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { fetchUserOrdersAction } from "../../store/actions/OrderThunks";
import UserOrderPaginationRowComponent from "./components/UserOrderPaginationRowComponent";

//helpers

const filterStates = {
  pending: ["pending", "partial_processing"],
  processing: ["processing", "forPickUp"],
  shipped: ["shipped"],
  delivered: ["delivered"],
  cancelled: ["cancelled", "partially_cancelled"],
  refunded: ["refunded"],
};

const UsersOrderPage = () => {
  // to be refactored
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((s) => s.auth);

  const { userOrders } = useSelector((s) => s.order);
  const [statusCount, setStatusCount] = useState({});
  const [activeStatus, setActiveStatus] = useState("all");

  const [refreshPageCount, setRefreshPageCount] = useState(0);

  const [orders, setOrders] = useState([]);

  const isMounted = useRef(true);

  const fetchUsersOrders = useCallback(async () => {
    try {
      const resultAction = await dispatch(fetchUserOrdersAction());
      if (
        fetchUserOrdersAction.fulfilled.match(resultAction) &&
        isMounted.current
      ) {
        console.log("result action", resultAction.payload);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("userOrders", userOrders);
    }
  }, [dispatch]);

  useEffect(() => {
    isMounted.current = true; // iu know this dont work anymore

    if (token) fetchUsersOrders();

    return () => {
      isMounted.current = false;
    };
  }, [fetchUsersOrders, token]);

  useEffect(() => {
    if (!token) return;

    const ordersArray = Array.isArray(userOrders)
      ? userOrders
      : Object.values(userOrders || {}).flat();

    if (!activeStatus || !filterStates[activeStatus]) {
      setOrders(ordersArray);
      return;
    }

    const allowedStatus = filterStates[activeStatus];

    const filtered = ordersArray.filter((order) =>
      order.items.some((item) => allowedStatus.includes(item.sellerStatus)),
    );

    setOrders(filtered);

    setRefreshPageCount((p) => p + 1);
  }, [activeStatus, userOrders, token]);

  const counts = useMemo(() => {
    if (!Array.isArray(userOrders) || userOrders.length === 0) {
      return {
        pending: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
        refunded: 0,
      };
    }

    let pending = 0;
    let processing = 0;
    let shipped = 0;
    let delivered = 0;
    let cancelled = 0;
    let refunded = 0;

    userOrders.forEach((order) => {
      order.items.forEach((item) => {
        switch (item.sellerStatus) {
          case "pending":
            pending++;
            break;
          case "processing":
          case "forPickUp":
            processing++;
            break;
          case "shipped":
            shipped++;
            break;
          case "delivered":
            delivered++;
            break;
          case "cancelled":
            cancelled++;
            break;
          case "refunded":
            refunded++;
            break;
          default:
            break;
        }
      });
    });

    return { pending, processing, shipped, delivered, refunded, cancelled };
  }, [userOrders]);

  const OrderStatusBar = ({ counts }) => {
    const statuses = [
      {
        key: "pending",
        icon: <FaClock />,
        label: "Pending",
        count: counts?.pending || 0,
      },
      {
        key: "processing",
        icon: <FaProcedures />,
        label: "Processing",
        count: counts?.processing || 0,
      },
      {
        key: "shipped",
        icon: <FaTruck />,
        label: "Shipped",
        count: counts?.shipped || 0,
      },
      {
        key: "delivered",
        icon: <FaCheck />,
        label: "Delivered",
        count: counts?.delivered || 0,
      },
      {
        key: "cancelled",
        icon: <FaTimes />,
        label: "Canceled",
        count: counts?.cancelled || 0,
      },
      {
        key: "refunded",
        icon: <FaXmark />,
        label: "Refunded",
        count: counts?.refunded || 0,
      },
    ];

    useEffect(() => {
      console.log("orders", orders);
    }, [orders])

    


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
              <span
                className="absolute -top-2 -right-2 bg-skin-red font-bold
                w-[22px] h-[22px] rounded-full flex items-center justify-center text-stylep4"
              >
                {s.count}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="page-body-background in-center relative">
      <div className="page-body-section items-start justify-start z-10 px-2 gap-2">
        <OrderStatusBar counts={counts} />

        <UserOrderPaginationRowComponent orders={orders} refreshPageCount={refreshPageCount}/>
      </div>
    </div>
  );
};

export default UsersOrderPage;
