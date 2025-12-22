import { useDispatch, useSelector } from "react-redux"
import PaginationComponent from "../../../components/Pagination/Pagination";

const AdminUserListComponent = () => {
  const { users, userPagination } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  console.log("USERS-FOR-ADMIN", users, userPagination);

  return (
    <div className="w-full h-full bg-yellow-300">
      <h1>TRY</h1>
      <PaginationComponent
        pagination={userPagination}
        onPageCHange={()=> console.log("pageChange in userListForAdmin")}
        />
    </div>
  )
}

export default AdminUserListComponent;