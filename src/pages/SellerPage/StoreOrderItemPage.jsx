import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductImages from "../../components/ImagesComponent/components/ProductImageComponent";
import { FaEnvelope } from "react-icons/fa";

const StoreOrderItemPage = () => {
  const { itemId } = useParams();
  

  const item = useSelector((s) => s.order.item);

  
  useEffect(() => {
    if (item?._id) {
      console.log("Loaded order item:", item);
    }
  }, [item]);

  if (!item?._id) {
    return <div className="page-body-background in-center">Loading...</div>;
  }

  return (
    <div className="page-body-background in-center">
      <div className="page-body-section in-center relative text-skin-color1">
        <div className="flex flex-col w-full min-h-[80vh] px-2 in-center">
          <div className="absolute inset-0 bg-white/10 blur-lg" />
          <div className="absolute inset-0 bg-skin-colorContent/5 blur-lg" />

          <div
            className="flex flex-col w-full h-full gap-3 rounded-xl in-center
           bg-skin-primary/75 relative z-10 px-2 py-4 text-skin-color1"
          >
            <span className="text-skin-color1 text-styleh4 font-display">
              ARRANGE SHIPMENT
            </span>
            
            <span
              className="flex flex-col w-full py-2 rounded-lg bg-gray-200/10 px-2
              text-stylep3 in-center"
            >
              <div className="flex w-[130px] h-[130px]">
                  <ProductImages productImages={item?.product?.productImages} />
              </div>
            </span>


            <span
              className="flex flex-col w-full py-2 rounded-lg bg-gray-200/10 px-2
              text-stylep3"
            >
              <div className="absolute inset-0 bg-white/5 blur-lg " />
              <span className="text-stylep1 font-semibold ">{item?.name}</span>
              <span>Qty: {item?.quantity}</span>
              <span>Status: {item?.productShippingStatus}</span>
              <span>Price: ₱{item?.price}</span>
            </span>

            <span className="flex flex-row w-1/2 min-h-[8vh] gap-2 in-center 
            bg-skin-green text-skin-color1 ">
              <FaEnvelope size={16}/> SHIP PRODUCT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreOrderItemPage;
