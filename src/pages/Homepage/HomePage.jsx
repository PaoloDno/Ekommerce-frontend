import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../../store/actions/AuthThunks";
import { Link, useNavigate } from "react-router-dom";
import ThemeSelectorProfile from "./ThemeSelectorProfile";
import { useTheme } from "../../context/ThemeContext";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isPending } = useSelector((state) => state.auth);

  const { current, changeTheme } = useTheme();
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
    return (
      <div className="flex justify-center items-center w-full h-full">
        Loading...
      </div>
    );
  }

  return (
    <div className="page-section">
      <div className="page-body">
        <div
          className="absolute opacity-5 inset-0 h-[90vw] w-full
         bg-gradient-to-r to-white from-transparent z-0"
        ></div>

        <div className="text-div-bgblur"></div>

        <div className="text-div">
          <div className="grid grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col space-y-3 p-2">
              <div
                className="inline-block h-[100px] w-[100px]
             md:h-[150px] md:w-[150px]
             bg-skin-colorContent rounded-full"
              ></div>
              <span className="text-div-header">
                Hello {profile?.username || "Guest"}!
              </span>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-div-header">Profile Detail</h2>
              <div className="text-line" />
              <span className="flex flex-col md:grid md:grid-cols-2 w-full justify-between">
                <span>Firstname: {profile?.firstname || ""}</span>
                <span>Lastname: {profile?.lastname || ""}</span>
              </span>
              <h2 className="text-div-header">Address</h2>
              <div className="text-line" />
              <span>{profile?.address?.[0]?.street || ""}</span>
              <span>
                {profile?.address?.[0]?.city || ""},{" "}
                {profile?.address?.[0]?.country || ""} -{" "}
                {profile?.address?.[0]?.postalCode || ""}
              </span>
            </div>
          </div>
        </div>

        <div className="text-div">
          <h2 className="text-div-header">Check Store</h2>
          <div className="text-line w-full items-center justify-center" />
          <div className="flex flex-col w-full items-center md:ml-3 md:items-start justify-center">
            {profile?.storeName == null ? (
              <>
                <p>You dont own a store</p>
                <h2>Get Started...</h2>
                <Link to={`/create-store`} className="link-button">
                  Start Selling
                </Link>
              </>
            ) : (
              <>
                <p>visit your store</p>
                <h2>Go to Store...</h2>
                <Link to={`/user-store`} className="link-button">
                  Go to Store
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="text-div">
          <span>Cart Items: {profile?.cart?.length || 0}</span>
        </div>

        <div className="text-div">
          <h2 className="text-div-header">Theme</h2>
          <ThemeSelectorProfile />
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
