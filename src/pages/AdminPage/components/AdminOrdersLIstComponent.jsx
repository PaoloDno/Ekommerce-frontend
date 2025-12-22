import { useDispatch, useSelector } from "react-redux"
import PaginationComponent from "../../../components/Pagination/Pagination";

const AdminOrdersListComponent = () => {
  const { orders, orderPagination } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  console.log("ORDERS-FOR-ADMIN", orders, orderPagination);

  return (
    <div className="w-full h-full justify-center items-center bg-blue-300">
      <h1>TRY</h1>
      <PaginationComponent
        pagination={ orderPagination }
        onPageCHange={()=> console.log("pageChange in orderListForAdmin")}
        />
    </div>
  )
}

export default AdminOrdersListComponent;