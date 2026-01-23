import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import OrderStatusBar from "./components/OrderStatusBar";
import ProductImages from "../../components/ImagesComponent/components/ProductImageComponent";
import {
  patchSellerAcceptItemOrderAction,
  patchSellerAcceptOrderAction,
  getSellerOrdersAction,
} from "../../store/actions/OrderThunks";

const filterStates = {
  pending: ["pending"],
  processing: ["processing", "forPickUp"],
  shipped: ["shipped"],
  delivered: ["delivered"],
};

const StoreOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useParams();

  const storeOrders = useSelector((s) => s.order?.storeOrders || []);
  const seller = useSelector((s) => s.seller?.seller);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getSellerOrdersAction(seller._id));
    }
  }, [dispatch, seller?._id]);

  useEffect(() => {
    if (!seller?._id) return;

    const ordersArray = Array.isArray(storeOrders)
      ? storeOrders
      : Object.values(storeOrders).flat();

    if (!status || !filterStates[status]) {
      setOrders(ordersArray);
      return;
    }

    const allowedStatuses = filterStates[status];

    const filtered = ordersArray.filter((order) =>
      order.items.some((item) => {
        return (
          item.seller?.toString() === seller._id.toString() &&
          allowedStatuses.includes(item.sellerStatus)
        );
      })
    );

    setOrders(filtered);
  }, [storeOrders, seller?._id, status]);

  const handleOrderAccept = async (orderId) => {
    const result = await dispatch(
      patchSellerAcceptOrderAction({ orderId, sellerId: seller._id })
    );
    if (patchSellerAcceptOrderAction.fulfilled.match(result)) {
      console.log("Order accepted:", orderId);
    }
  };

  const handleItemAccept = async (orderId, itemId) => {
    console.log("Trigger");
    console.log(orderId);
    console.log(itemId);
    
    const result = await dispatch(
      patchSellerAcceptItemOrderAction({ orderId, itemId })
    );
    if (patchSellerAcceptItemOrderAction.fulfilled.match(result)) {
      console.log("Item accepted:", itemId);
    }
  };

  return (
    <div className="page-body-background in-center">
      <div className="page-body-section in-center relative py-4 px-2 gap-2">
        <OrderStatusBar sellerId={seller?._id} />

        <div className="flex flex-col w-full h-[130vh] overflow-y-auto p-3 rounded-2xl
          bg-skin-colorContent/20 backdrop-blur-xl border border-white/20 shadow-xl gap-4">

          {orders.map((order) => {
            const sellerItems = order.items.filter(
              (item) => item.seller.toString() === seller._id
            );

            if (!sellerItems.length) return null;

            return (
              <div
                key={order._id}
                className="flex flex-col gap-3 p-4 rounded-xl
                  bg-skin-primary/35 backdrop-blur-lg border border-white/40 shadow-lg"
              >
                <div className="flex flex-col md:flex-row gap-1 text-stylep4 text-skin-color1 justify-between w-full">
                  <div className="flex flex-col md:w-3/4">
                    <span className="text-styleh3 capitalize">
                      Status: {order.status}
                    </span>

                    <span className="opacity-90">
                      Buyer: {order.user?.lastname}, {order.user?.firstname} – {order.user?.email}
                    </span>

                    <span className="opacity-90">
                      Address: {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.country}
                    </span>
                  </div>

                  {order.status === "pending" && (
                    <div className="flex md:w-1/4 items-end justify-center">
                      <button
                        onClick={() => handleOrderAccept(order._id)}
                        className="flex in-center bg-skin-green text-skin-color1
                          py-1 px-3 min-w-[130px] rounded-full text-stylep2"
                      >
                        Accept Order
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 mt-2">
                  {sellerItems.map((item) => (
                    <div
                      key={item._id}
                      className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 rounded-xl justify-between px-4
                        bg-skin-colorContent text-skin-colorContent backdrop-blur-md
                        border border-white/30 shadow-md"
                    >
                      <div
                        onClick={() => navigate(`/product/${item.product._id}`)}
                        className="cursor-pointer flex h-[120px] w-[120px]
                          rounded-lg overflow-hidden bg-black/10"
                      >
                        <div className="w-full h-full flex items-center justify-center border-2 border-gray-500/20">
                          <ProductImages productImages={item.product?.productImage} />
                        </div>
                      </div>

                      <div className="flex flex-col justify-center">
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-stylep3 opacity-80">
                          ₱{item.price} × {item.quantity} = ₱{item.quantity * item.price}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <span className="px-4 py-1 rounded-full text-sm capitalize
                          bg-skin-fill-4/50 text-skin-colorHigh border border-white/40">
                          {item.sellerStatus}
                        </span>
                      </div>

                      <div className="flex items-center justify-end">
                        {item.sellerStatus === "pending" && (
                          <button
                            onClick={() => handleItemAccept(order._id, item._id)}
                            className="px-4 py-2 rounded-lg text-sm
                              bg-skin-green text-skin-color1 hover:bg-skin-primary/80 transition"
                          >
                            Accept Item Order
                          </button>
                        )}
                        {item.sellerStatus === "processing" && (
                          <button
                            onClick={() => handleItemAccept(order._id, item._id)}
                            className="px-4 py-2 rounded-lg text-sm
                              bg-skin-green text-skin-color1 hover:bg-skin-primary/80 transition"
                          >
                            Request Shipment
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoreOrdersPage;
