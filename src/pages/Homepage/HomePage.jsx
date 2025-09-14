import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../../store/actions/AuthThunks";

const HomePage = () => {
  const dispatch = useDispatch();
  const { token, profile, isLoading } = useSelector((state) => state.auth);

  // 🔹 Async fetch handler
  const fetchProfile = useCallback(async () => {
    if (token) {
      await dispatch(getUserProfileAction()); 
    }
  }, [dispatch, token]);

  // 🔹 Fetch profile on mount
  useEffect(() => {
    if (token && !profile) {
      fetchProfile();
    }
  }, [fetchProfile, token, profile]);

  return (
    <div className="page-section">
      <div className="page-body">
        <div className="flex flex-col text-black">
          {/* Debug info */}
          <span>Token: {token || "No token"}</span>
          <span>Username: {profile?.username || "Guest"}</span>
          <span>
            Fullname: {`${profile?.firstname || ""} ${profile?.lastname || ""}`}
          </span>
          <span>
            Address:
          </span>
        </div>

        <div>Store</div>
        <div>
          <span>Cart Items: {profile?.cart?.length || 0}</span>
        </div>
        <div>Reviews</div>
        <div>Order History</div>

        {/* 🔹 Refresh Button */}
        <button
          onClick={fetchProfile}
          disabled={isLoading}
          className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? "Refreshing..." : "Refresh Profile"}
        </button>
      </div>
      <div className="page-background"></div>
    </div>
  );
};

export default HomePage;
