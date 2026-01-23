import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrdersAction } from "../../../store/actions/OrderThunks";
import { useNavigate } from "react-router-dom";

const OrderStatusBar = ({ sellerId }) => {
  const { storeOrders } = useSelector((s) => s.order);
  const { seller } = useSelector((s) => s.seller);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("store-Id", sellerId);
  useEffect(() => {
    if (sellerId) {
      dispatch(getSellerOrdersAction(sellerId));
    }
    console.log(seller);
    console.log(storeOrders);
  }, [dispatch, sellerId]);

  const counts = useMemo(() => {
    if (!Array.isArray(storeOrders) || storeOrders.length === 0) {
      return { pending: 0, toShip: 0, shipped: 0, received: 0 };
    }

    let pending = 0;
    let toShip = 0;
    let shipped = 0;
    let received = 0;

    storeOrders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.seller !== seller?._id) return;

        switch (item.sellerStatus) {
          case "pending":
            pending++;
            break;
          case "processing":
          case "forPickUp":
            toShip++;
            break;
          case "shipped":
            shipped++;
            break;
          case "delivered":
            received++;
            break;
          default:
            break;
        }
      });
    });

    return { pending, toShip, shipped, received };
  }, [storeOrders, seller?._id]);

  const StatusButton = ({ label, count, bordered, redirect }) => (
    <div
      onClick={() => navigate(`/store-orders/${redirect}`)}
      className={`text-center w-full h-full flex in-center px-2 relative
        hover:bg-skin-primary/15 hover:text-skin-color1 transition-all duration-500 text-stylep4
        ${bordered ? "border-x-2 border-skin-colorBorder2/40" : ""}`}
    >
      {label}
      <span
        className="absolute -right-2 -top-2 box-content z-20 p-1 h-[17px] w-[17px] bg-skin-red/70 text-skin-color1 rounded-full in-center
      "
      >
        {count}
      </span>
    </div>
  );

  return (
    <div
      className="flex flex-row in-center w-full h-[10vh] 
        rounded-full bg-skin-colorContent text-skin-colorContent px-2 py-4"
    >
      <StatusButton
        label="PENDING ORDER"
        count={counts.pending}
        redirect={"pending"}
      />
      <StatusButton
        label="ORDER TO SHIP"
        count={counts.toShip}
        redirect={"processing"}
        bordered
      />
      <StatusButton
        label="SHIPPED ORDER"
        count={counts.shipped}
        redirect={"shipped"}
        bordered
      />
      <StatusButton
        label="ORDER RECEIVED"
        count={counts.received}
        redirect={"recieved"}
      />
    </div>
  );
};

export default OrderStatusBar;
