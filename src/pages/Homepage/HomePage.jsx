import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../../store/actions/AuthThunks";
import { useNavigate } from "react-router-dom";
import ThemeSelectorProfile from "./ThemeSelectorProfile";
import { useTheme } from "../../context/ThemeContext";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isPending } = useSelector((state) => state.auth);

  const {current, changeTheme } = useTheme();
  const [profile, setProfile] = useState({});
  const isMounted = useRef(true);

  const fetchProfile = useCallback(async () => {
    if (!token) return; // just exit, handle UI separately

    try {
      const resultAction = await dispatch(getUserProfileAction());
      if (
        getUserProfileAction.fulfilled.match(resultAction) &&
        isMounted.current
      ) {
        setProfile(resultAction.payload.data);
        changeTheme(resultAction.payload.data.userTheme);
      }
    } catch (error) {
      console.error(error);
    }
    
    console.log(profile);
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

  if (!token) {
    return (
      <div className="page-section">
        <div className="page-body">
        <p className="text-white p-4">Please login to continue</p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Go to Login
        </button>
        </div>
      </div>
    );
  }

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
            <span>firstname: {profile?.firstname || ""}</span>
            <span>lastname: {profile?.lastname || ""}</span>
          </span>

          <h2>Address</h2>
          <span>{profile?.address?.[0]?.street || ""}</span>
          <span>
            {profile?.address?.[0]?.city || ""},{" "}
            {profile?.address?.[0]?.country || ""} -{" "}
            {profile?.address?.[0]?.postalCode || ""}
          </span>

          <h2>Theme</h2>
          <ThemeSelectorProfile />
        </div>

        <div className="text-div">
          <div>Check Store</div>
          <button>Go To Store</button>
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
      </div>

      <div className="page-background"></div>
    </div>
  );
};

export default HomePage;
