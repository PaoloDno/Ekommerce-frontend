import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../../store/actions/AuthThunks";

const HomePage = () => {
  const dispatch = useDispatch();
  const { token, isPending } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const isMounted = useRef(true);

  const fetchProfile = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const resultAction = await dispatch(getUserProfileAction());
      if (
        getUserProfileAction.fulfilled.match(resultAction) &&
        isMounted.current
      ) {
        console.log(resultAction.payload.data);
        setProfile(resultAction.payload.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, [dispatch, token]);

  useEffect(() => {
    isMounted.current = true;
    if (token) {
      fetchProfile();
    }
    return () => {
      isMounted.current = false;
    };
  }, [fetchProfile, token]);

  if (isPending) {
    return <div className="w-full h-full">Loading...</div>;
  }

  return (
    <div className="page-section">
      <div className="page-body">
        <div className="text-div">
          <h2>Profile Detail</h2>
          <span>Hello {profile?.username || "Guest"}!</span>
          <span className="flex flex-col">
            <span>firstname: {`${profile?.firstname || ""}`}</span>
            <span>lastname: {`${profile?.lastname || ""}`}</span>
          </span>
          <span>Address:</span>
        </div>

        <div className="text-div">
          <div>Check Store</div>
        </div>
        <div className="text-div">
          <span>Cart Items: {profile?.cart?.length || 0}</span>
        </div>
        <div className="text-div">
          <span>Order</span>
        </div>
        <div className="text-div">
          <span>Reviews</span>
        </div>
        {/* 🔹 Refresh Button 
        <button
          onClick={fetchProfile}
          disabled={loading}
          className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh Profile"}
        </button>
        */}
      </div>
      <div className="page-background"></div>
    </div>
  );
};

export default HomePage;