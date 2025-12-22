import { useDispatch, useSelector } from "react-redux"
import PaginationComponent from "../../../components/Pagination/Pagination";

const AdminProductListComponent = () => {
  const { products, productsPagination } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  console.log("PRODUCTS-FOR-ADMIN", products, productsPagination);

  return (
    <div className="w-full h-full justify-center items-center bg-red-400">
      <h1>TRY</h1>
      <PaginationComponent
        pagination={productsPagination}
        onPageCHange={()=> console.log("pageChange in productListForAdmin")}
        />
    </div>
  )
}

export default AdminProductListComponent;