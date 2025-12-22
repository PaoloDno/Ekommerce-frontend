import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdminDashboardsAction } from "../../../store/actions/AdminThunks";

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
    <span className="text-gray-500 text-sm">{title}</span>
    <span className="text-2xl font-bold">{value}</span>
  </div>
);

const AdminDashBoardComponent = () => {
  const dispatch = useDispatch();
  const { dashboard, isPending } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAdminDashboardsAction());
  }, [dispatch]);

  if (isPending || !dashboard) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  const {
    totals,
    ordersByStatus,
    revenue,
    activity,
  } = dashboard;

  return (
    <div className="w-full h-full p-6 space-y-6 bg-gray-100">
      
      {/* Totals */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Users" value={totals.users} />
        <StatCard title="Sellers" value={totals.sellers} />
        <StatCard title="Products" value={totals.products} />
        <StatCard title="Orders" value={totals.orders} />
      </div>

      {/* Revenue */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
        <p className="text-3xl font-bold text-green-600">
          ₱{revenue.toLocaleString()}
        </p>
      </div>

      {/* Orders by Status */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Orders by Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(ordersByStatus).map(([status, count]) => (
            <div
              key={status}
              className="flex flex-col items-center bg-gray-50 rounded-lg p-3"
            >
              <span className="text-sm text-gray-500 capitalize">
                {status}
              </span>
              <span className="text-xl font-semibold">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Last 7 Days</h3>
        <div className="flex gap-6">
          <div>
            <p className="text-gray-500 text-sm">New Users</p>
            <p className="text-xl font-bold">
              {activity.newUsersLast7Days}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">New Orders</p>
            <p className="text-xl font-bold">
              {activity.newOrdersLast7Days}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashBoardComponent;
