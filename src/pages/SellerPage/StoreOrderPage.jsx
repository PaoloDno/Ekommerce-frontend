import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { getSellerOrderAction } from "../../store/actions/OrderThunks";

const StoreOrderPage = () => {
  const {orderId} = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [order, setOrder] = useState({});
    //** 
    // Unsure if data shaping should be done entirely in the backend
    // I would be looking where in my code i maipulate the data oof
    // and the frontend should only consume already-processed results. 
    // */}
  const fetchStoreOrder = useCallback( async() => {
    try {
      console.log(orderId);

      const resultAction = await dispatch(getSellerOrderAction(orderId));

      if(getSellerOrderAction.fulfilled.match(resultAction)) {
        setOrder(resultAction.data);
      }

    } catch (error) {
      console.log(error)
    } finally {
      console.log("Order", order);
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    fetchStoreOrder();
  }, [dispatch, orderId]);

  return (
    <div className="page-body-background in-center">
      <div className="page-body-section in-center relative">

      </div>
    </div>
  )
}

export default StoreOrderPage;