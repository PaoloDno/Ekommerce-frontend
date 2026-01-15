import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import OrderStatusBar from "./components/OrderStatusBar";
import ProductImages from "../../components/ImagesComponent/components/ProductImageComponent";

const StoreOrdersPage = () => {
  const storeOrders = useSelector((s) => s.order?.storeOrders || []);
  const { status } = useParams();

  const navigate = useNavigate();

  const ordersArray = Array.isArray(storeOrders)
    ? storeOrders
    : Object.values(storeOrders).flat();

  const filteredOrders = status
    ? ordersArray.filter((order) => order.status === status)
    : ordersArray;

  return (
    <div className="page-body-background in-center">
      <div className="page-body-section in-center relative py-4 px-2 gap-2">
        <OrderStatusBar />

        {/* Glass container */}
        <div
          className="flex flex-col w-full h-[130vh] overflow-x-hidden overflow-y-auto
          p-4 rounded-2xl
          bg-skin-colorContent/20 backdrop-blur-xl
          border border-white/20
          shadow-xl shadow-black/20
          gap-3 text-stylep3 font-Receipt"
        >
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="flex flex-col w-full p-4
                rounded-xl text-skin-color1
                bg-skin-primary/35 backdrop-blur-lg
                border border-white/25
                shadow-lg shadow-black/20"
            >
              <span className="capitalize text-styleh3">
                Status: {order.status}
              </span>

              <span className="opacity-90">
                Buyer: {order?.buyer?.username} - {order?.buyer?.email}
              </span>

              <div className="flex flex-row flex-wrap gap-3 mt-2">
                {order?.items
                  ?.filter(
                    (item) => !status || item.productShippingStatus === status
                  )
                  .map((item) => (
                    <div
                      onClick={() => navigate(`/store-order/${item._id}`)}
                      key={item._id}
                      className="grid grid-cols-2 px-3 py-3 gap-3
                        rounded-xl bg-skin-colorContent text-skin-colorContent backdrop-blur-md
                        border border-white/30 shadow-md shadow-black/20
                        w-3/4 max-w-[320px] md:w-[320px]
                        text-stylep4"
                    >
                      <div className="relative col-span-2 w-full h-[140px] overflow-hidden 
                      rounded-lg flex items-center justify-center">
                        <div className="w-[120px] h-[120px]">
                          <ProductImages
                            productImages={item?.product?.productImage}
                          />
                        </div>
                      </div>

                      <span className="col-span-2 font-medium">
                        Product: {item.name}
                      </span>

                      <span className="col-span-2">
                        Status:
                        <span
                          className="ml-2 px-5 py-1 rounded-full
                          bg-skin-fill-4 text-skin-colorHigh backdrop-blur
                          border border-white/40
                          shadow-inner"
                        >
                          {item.productShippingStatus}
                        </span>
                      </span>

                      <span>Price: {item.price}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreOrdersPage;
