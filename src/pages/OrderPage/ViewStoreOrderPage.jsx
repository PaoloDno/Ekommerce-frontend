import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { getOrderByIdAction } from "../../store/actions/OrderThunks";


const ViewStoreOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((s) => s.auth);

  const {orderId} = useParams;

  const fetchOrder = useCallback( async () => {
    try {
      const resultAction = await dispatch(getOrderByIdAction(orderId));

      if (getOrderByIdAction.fulfilled.match(resultAction) && isMounted.current) {
        console.log("order view page", resultAction.payload);
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    isMounted.current = true;

    if(token) fetchOrder();

    return () => {
      isMounted.current = false;
    }
  }, [fetchOrder]);
}