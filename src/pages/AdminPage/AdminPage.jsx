import { useState } from "react"

import AdminDashBoardComponent from "./components/AdminDashBoardComponent";
import AdminOrdersListComponent from "./components/AdminOrdersLIstComponent";
import AdminProductListComponent from "./components/AdminProductsListComponent";
import AdminSellerListComponent from "./components/AdminSellerListComponents";
import AdminUserListComponent from "./components/AdminUsersListComponent";

const AdminPage = () => {
  const [active, setActive] = useState("dashboard");

  const menuItem = (key) =>
    `cursor-pointer rounded-md px-3 py-2 text-sm
     ${
       active === key
         ? "bg-gray-200 font-medium"
         : "hover:bg-gray-100"
     }`;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 border-r bg-white p-6">
        <h2 className="mb-6 text-xl font-semibold">Admin</h2>

        <ul className="space-y-2">
          <li className={menuItem("dashboard")} onClick={() => setActive("dashboard")}>
            Dashboard
          </li>
          <li className={menuItem("products")} onClick={() => setActive("products")}>
            Products
          </li>
          <li className={menuItem("orders")} onClick={() => setActive("orders")}>
            Orders
          </li>
          <li className={menuItem("users")} onClick={() => setActive("users")}>
            Users
          </li>
          <li className={menuItem("sellers")} onClick={() => setActive("sellers")}>
            Stores
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-8">
        {active === "dashboard" && <AdminDashBoardComponent />}
        {active === "products" && <AdminProductListComponent />}
        {active === "orders" && <AdminOrdersListComponent />}
        {active === "users" && <AdminUserListComponent />}
        {active === "sellers" && <AdminSellerListComponent />}
      </div>
    </div>
  );
};

export default AdminPage;


/**
 * "dashboard": {
    "totals": {
      "users": 120,
      "sellers": 18,
      "products": 342,
      "orders": 96
    },
    "ordersByStatus": {
      "pending": 12,
      "paid": 40,
      "shipped": 25,
      "delivered": 15,
      "cancelled": 4
    },
    "revenue": 158430,
    "activity": {
      "newUsersLast7Days": 9,
      "newOrdersLast7Days": 14
    }
  }
 */