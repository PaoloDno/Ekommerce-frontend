import { useDispatch, useSelector } from "react-redux"
import PaginationComponent from "../../../components/Pagination/Pagination";

const AdminSellerListComponent = () => {
  const { sellers, sellerPagination } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  console.log("PRODUCTS-FOR-ADMIN", sellers , sellerPagination );

  return (
    <div className="w-full h-full justify-center items-center bg-violet-300">
      <h1>TRY</h1>
      <PaginationComponent
        pagination={sellerPagination}
        onPageCHange={()=> console.log("pageChange in SellerListForAdmin")}
        />
    </div>
  )
}

export default AdminSellerListComponent;