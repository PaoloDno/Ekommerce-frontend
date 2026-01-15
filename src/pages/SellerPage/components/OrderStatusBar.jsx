import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrdersAction } from "../../../store/actions/OrderThunks";
import { useNavigate } from "react-router-dom";

const OrderStatusBar = ({ sellerId }) => {
  const { storeOrders } = useSelector((s) => s.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("storeOrder", storeOrders);
  useEffect(() => {
    if (sellerId) {
      dispatch(getSellerOrdersAction(sellerId));
    }
  }, [dispatch, sellerId]);

  const counts = useMemo(() => {
  if (!Array.isArray(storeOrders) || storeOrders.length === 0) {
    return { pending: 0, toShip: 0, received: 0 };
  }

  let pending = 0;
  let toShip = 0;
  let received = 0;

  storeOrders.forEach((order) => {
    order.items.forEach((item) => {
      if (["pending", "processing"].includes(item.productShippingStatus)) {
        pending++;
      } else if (item.productShippingStatus === "shipped") {
        toShip++;
      } else if (item.productShippingStatus === "delivered") {
        received++;
      }
    });
  });

  return { pending, toShip, received };
}, [storeOrders]);


  const StatusButton = ({ label, count, bordered, redirect }) => (
    <div
      onClick={() => navigate(`/store-orders/${redirect}`)}
      className={`text-center w-1/3 h-full flex in-center px-2 overflow-hidden relative
        hover:bg-skin-primary/15 hover:text-skin-color1 transition-all duration-500
        ${ bordered ? "border-x-2 border-skin-colorBorder2" : ""
      }`}
    >
      {label} ({count})
    </div>
  );

  return (
    <div className="flex flex-row in-center text-stylep4 w-full h-[10vh] 
        rounded-full bg-skin-colorContent text-skin-colorContent px-2 py-4">
      <StatusButton label="PENDING ORDER" count={counts.pending} redirect={"pending"} />
      <StatusButton label="ORDER TO SHIP" count={counts.toShip} redirect={"shipped"} bordered />
      <StatusButton label="ORDER RECEIVED" count={counts.received} redirect={"recieved"} />
    </div>
  );
};

export default OrderStatusBar;
