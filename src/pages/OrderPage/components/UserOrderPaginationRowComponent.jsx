import { useEffect, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { SiV } from "react-icons/si";
import ProductImages from "../../../components/ImagesComponent/components/ProductImageComponent";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { cancelUserOrdersAction } from "../../../store/actions/OrderThunks";

const UserOrderPaginationRowComponent = ({ orders, refreshPageCount }) => {
  
  const dispatch = useDispatch();

  const [ordersPage, setOrdersPage] = useState(1);
  const OrderPerPage = 6;

  const totalPages = Math.ceil(orders.length / OrderPerPage);

  const pagedOrders = orders.slice(
    (ordersPage - 1) * OrderPerPage,
    ordersPage * OrderPerPage,
  );

  useEffect(() => {
    setOrdersPage(1);
  }, [refreshPageCount]);

  const handleItemCancel = async (orderId ) =>{
    console.log("Trigger");
    const resultAction = await dispatch(cancelUserOrdersAction(orderId));
    if (cancelUserOrdersAction.fulfilled.match(resultAction)){
      console.log("ITEM CANCEL");
    }
  }

  return (
    <div className="flex flex-col gap-2 px-2 py-3 min-h-[60vh] w-full bg-gray-400/10 rounded-lg border border-skin-colorBorder1 mb-6">
      <div className="flex flex-row justify-between items-center mb-2 text-skin-color1">
        <span className="text-styleh4 font-display">
          Orders - {orders.length}
        </span>

        <div className="flex text-stylep4 font-semibold flex-row gap-1 items-center">
          <button
            onClick={() => setOrdersPage((p) => Math.max(1, p - 1))}
            className="px-2 py-1 bg-skin-fill-3 text-skin-colorContent rounded-sm w-[80px] lg:w-[120px] flex items-center justify-center"
            disabled={ordersPage === 1}
          >
            <FaArrowLeftLong size={14} />
          </button>

          <span>
            {ordersPage} of {totalPages}
          </span>

          <button
            onClick={() => setOrdersPage((p) => Math.min(totalPages, p + 1))}
            className="px-2 py-1 bg-skin-fill-3 text-skin-colorContent rounded-sm w-[80px] lg:w-[120px] flex items-center justify-center"
            disabled={ordersPage === totalPages}
          >
            <FaArrowRightLong size={14} />
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex flex-col w-full min-h-[75vh] overflow-x-hidden overflow-y-auto items-start justify-start gap-2 p-4">
        {pagedOrders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col w-full min-h-[120px] shadow-md text-stylep4
              bg-skin-colorContent text-skin-colorContent px-2 py-3 bg-opacity-95
              items-start justify-between rounded-md overflow-hidden"
          >
            <div className="flex flex-col w-full gap-1 relative overflow-hidden">
              <span className="flex items-center text-stylep3 font-semibold">
                Order#{order._id}
              </span>
              <div className="flex text-stylep4">
                Status -{" "}
                <span
                  className="flex flex-row items-center px-3 rounded-lg 
                bg-skin-fill-4 text-skin-colorHigh min-w-[110px] 
                in-center"
                >
                  {order?.status}
                </span>
              </div>
              <div className="flex flex-col opacity-85 text-stylep4 scale-y-90">
                Payment: {order?.payment?.isPaid ? "paid" : "pending"} -{" "}
                {order?.payment?.method} {"("}mode{")"}
              </div>
            </div>
            <div
              className="flex flex-row md:flex-col flex-nowrap items-start justify-start
              overflow-x-auto overflow-y-hidden gap-3 z-30 pb-4
              min-h-[260px] w-full bg-gray-400/5 rounded-lg p-2 border border-skin-colorBorder1"
            >
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-2 md:grid-cols-4 w-[240px] md:w-full min-h-[240px] md:min-h-[120px]
                    bg-skin-colorContent text-skin-colorContent p-2 rounded-md flex-shrink-0"
                >
                  <span className="flex in-center w-[100px] h-[100px] overflow-hidden">
                    <ProductImages
                      productImages={item?.product?.productImages}
                    />
                  </span>

                  <span className="flex flex-col text-stylep4 items-start justify-start">
                    <span className="font-semibold">Order Item Details</span>
                    <span>{item.name}</span>
                    <span>Price: {item?.price}</span>
                    <span className="flex flex-row items-center gap-2">
                      Ratings: {item?.product?.averageRating} <FaStar />
                    </span>
                  </span>

                  <span className="flex flex-col w-full col-span-2 md:col-span-1 text-stylep4 items-start justify-start">
                    <span className="font-semibold">Store</span>
                    <span className="flex-wrap truncate">
                      {item?.seller?.storeName}
                    </span>
                    <span className="flex-wrap truncate">
                      Email: {item?.seller?.email}
                    </span>
                    <span className="flex-wrap truncate">
                      Phone: {item?.seller?.phone}
                    </span>
                  </span>
                  {(item?.sellerStatus === "pending" || item?.sellerStatus === "processing") && (
                  <span className="flex flex-col col-span-2 md:col-span-1 text-stylep4 items-start justify-start">
                    <button className="bg-skin-red text-skin-color1 px-4 py-1 rounded-lg"
                      onClick={() => handleItemCancel(item._id)}
                    >
                      CANCEL ORDER
                    </button>
                  </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrderPaginationRowComponent;
