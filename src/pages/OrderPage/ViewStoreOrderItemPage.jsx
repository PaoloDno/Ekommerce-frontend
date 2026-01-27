import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { getItemByIdAction } from "../../store/actions/OrderThunks";


const ViewStoreOrderItemPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((s) => s.auth);

  const {itemId} = useParams;

  const fetchOrder = useCallback( async () => {
    try {
      const resultAction = await dispatch(getItemByIdAction(itemId));

      if (getItemByIdAction.fulfilled.match(resultAction) && isMounted.current) {
        console.log("order's item view page", resultAction.payload);
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

export default ViewStoreOrderItemPage;