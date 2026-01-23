import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"

//import { getOrdersByIdAction } from "../../store/actions/OrderThunks";


const OrderIdPage = () => {
  const { orderId } = useParams();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((s) => s.auth);

  const { order, isPending } = useSelector((s) => s.order);
/** 
  useEffect(()=> {
    if(!token) return;
    dispatch(getOrdersByIdAction(orderId));


    console.log(order);
  }, [dispatch, token, orderId])
*/
  if(isPending) {
    return(
    <div>
      Loading
    </div>
    )

  }

  return (
    <div>
      {orderId}
    </div>
  )
  
}

export default OrderIdPage;