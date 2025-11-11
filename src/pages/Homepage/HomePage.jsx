import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../../store/actions/AuthThunks";
import { Link, useNavigate } from "react-router-dom";
import ThemeSelectorProfile from "./ThemeSelectorProfile";
import { useTheme } from "../../context/ThemeContext";
import ProfileImage from "../../components/ImagesComponent/components/ProfileImageComponent";
import BannerImage from "../../components/ImagesComponent/components/BannerImageComponent";
import { FaLock, FaStore } from "react-icons/fa";

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
        console.log(resultAction.payload.data);
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
      <div className="absolute inset-0 z-20 w-full h-[40vh] left-0 rounded-b-lg">
        <BannerImage bannerImage={"B1"} />
      </div>

      <div className="page-body">
        <div
          className="absolute opacity-5 inset-0 h-[90vw] w-full
         bg-gradient-to-r to-white from-transparent z-0"
        ></div>

        <div className="text-div-bgblur"></div>
        <div className="flex w-full h-[120px]"></div>
        <div className="text-div overflow-hidden relative">
          <div className="grid grid-cols-2 md:grid-cols-3 mt-10">
            <div className="flex flex-col w-full items-center space-y-3 p-2">
              <div
                className="inline-block h-[100px] w-[100px]
                  md:h-[150px] md:w-[150px]
                  bg-skin-colorContent rounded-full md:rounded-none"
              >
                <ProfileImage profileImage={profile?.userAvatar} />
              </div>
              <span className="text-div-header">
                Hello {profile?.username || "Guest"}!
              </span>
            </div>
            <div
              className="grid lg:grid-cols-2 grid-cols-1 md:col-span-2 items-center justify-center w-full bg-skin-colorContent
            text-skin-colorContent p-2 mt-1 text-stylep3 gap-2 rounded-lg "
            >
              <span className="flex flex-col items-start w-full h-full">
                <h2 className="text-div-header">Profile Detail</h2>
                <div className="text-line" />
                <span className="flex flex-col h-full w-full justify-start">
                  <span>Username: {profile?.username || ""}</span>
                  <span>Firstname: {profile?.firstname || ""}</span>
                  <span>Lastname: {profile?.lastname || ""}</span>
                  <span>Email: {profile?.email || ""}</span>
                </span>
              </span>
              <span className="flex flex-col h-full w-full">
                <h2 className="text-div-header">Address</h2>
                <div className="text-line" />
                <span>{profile?.address?.[0]?.street || ""}</span>
                <span>
                  {profile?.address?.[0]?.city || ""},{" "}
                  {profile?.address?.[0]?.country || ""} -{" "}
                  {profile?.address?.[0]?.postalCode || ""}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="text-div">
          <h2 className="text-div-header">User Store</h2>
          <div className="text-line w-full items-center justify-center" />

          <div className="grid grid-cols-2 md:grid-cols-3 w-full my-2 items-center md:items-start justify-center gap-2">
            {profile?.storeName == null ? (
              <div className="flex flex-col bg-skin-colorContent bg-opacity-15 rounded-md w-full h-full p-3">
                <p className="text-skin-color1 mb-1">You don’t own a store yet.</p>
                <h2 className="font-semibold mb-2">
                  Get Started...{" "}
                  <span className="text-skin-accent">
                    {profile?.storeName || "Your Store Awaits"}
                  </span>
                </h2>
                <Link to="/create-store" className="link-button">
                  Start Selling
                </Link>
              </div>
            ) : (
              <div className="flex flex-col bg-skin-colorContent bg-opacity-15 rounded-md w-full h-full p-3">
                <p className="text-skin-color1 mb-1">
                  Manage your business easily.
                </p>
                <h2 className="font-semibold mb-2">Your Store is Live!</h2>
                <Link to="/user-store" className="link-button mx-auto">
                  VISIT STORE
                </Link>
              </div>
            )}

            <div className="grid grid-cols-[1fr_2fr] relative container items-center justify-start gap-3 bg-skin-colorContent bg-opacity-15 rounded-md w-full h-full p-3">
              <FaStore className="size-8 w-full text-skin-color2" />
              <span className="text-stylep3 text-skin-color1 leading-tight">
                “Turn creativity into commerce — your store, your story.” - Ekommerce
              </span>
            </div>
            <div className="grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_1.5fr] col-span-2 md:col-span-1 relative container items-center justify-start gap-3 bg-skin-colorContent bg-opacity-15 rounded-md w-full h-full p-3">
              <FaLock className="size-8 w-full text-skin-color2" />
              <span className="text-stylep3 text-skin-color1 leading-tight flex flex-col">
                Keep your store secure.{" "}
                <button className="ml-1 px-2 py-1 w-fit text-white bg-gray-500 hover:bg-red-500 rounded-md transition-colors duration-150 my-2">
                  Learn More
                </button>
                We appreciate keeping our community great
              </span>
            </div>
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
