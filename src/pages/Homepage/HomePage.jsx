import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../../store/actions/AuthThunks";
import { getCartAction } from "../../store/actions/CartThunks";
import { Link, useNavigate } from "react-router-dom";
import ThemeSelectorProfile from "./ThemeSelectorProfile";
import { useTheme } from "../../context/ThemeContext";
import ProfileImage from "../../components/ImagesComponent/components/ProfileImageComponent";
import BannerImage from "../../components/ImagesComponent/components/BannerImageComponent";
import { FaBell, FaLock, FaShoppingCart, FaStore, FaUser } from "react-icons/fa";
import { getUserNotificationsAction } from "../../store/actions/NotificationThunks";
import { FaBoxArchive, FaPencil } from "react-icons/fa6";
import UserHomePageSectionComponent from "./components/UserHomePageSectionComponent";
import StoreHomepageSectionComponent from "./components/StoreHomePageSectionComponent";
import CartHomePageSectionComponent from "./components/CartHomePageSectionComponent";
import { getUserOrdersAction } from "../../store/actions/OrderThunks";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { notifications, unreadCount } = useSelector((state) => state.notif);

  const { changeTheme } = useTheme();

  const {profile} = useSelector((state) => state.auth);
  const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const { orders } = useSelector((state) => state.order);

  const [activeSection, setActiveSection] = useState("profile");

  /* ---------------- DERIVED STATE ---------------- */
  const sellerNotif = notifications.filter((n) => n.role === "seller");
  const userNotif = notifications.filter((n) => n.role === "user");

  /* ---------------- FETCH ALL USER DATA ---------------- */
  useEffect(() => {
    if (!token) return;

    dispatch(getUserProfileAction()).then((res) => {
      if (getUserProfileAction.fulfilled.match(res)) {
        
        console.log("payload", res.payload);
        console.log("profile", profile);
      }
    });

    dispatch(getCartAction());
    dispatch(getUserOrdersAction());
    dispatch(getUserNotificationsAction());
    console.log("profile", profile);
  }, [dispatch, token]);

  /* ---------------- APPLY USER THEME ---------------- */
  useEffect(() => {
    if (profile?.userTheme) {
      changeTheme(profile.userTheme);
    }
  }, [profile?.userTheme, changeTheme]);

  /* ---------------- DEBUG (SAFE) ---------------- */
  useEffect(() => {
    console.log("Notifications:", notifications);
    console.log("Unread:", unreadCount);
    console.log("Seller notif:", sellerNotif);
    console.log("User notif:", userNotif);
    console.log("Profile", profile);
    console.log("Cart", items);
    console.log("quantity", totalPrice, totalQuantity);
    console.log("Order", orders);
  }, [notifications, unreadCount, sellerNotif, userNotif]);

  /* ---------------- AUTH GUARD ---------------- */
  if (!token) {
    return (
      <div className="page-body-background in-center">
        <div className="page-body-section in-center">
          <p className="text-skin-color1 text-styleh4">
            Please login to continue
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 mt-2 w-[300px] rounded-md bg-skin-green"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  {/** 
  
    if (isPending) {
    return (
      <div className="flex bg-skin-primary text-skin-color1 justify-center items-center w-full min-h-screen">
        Loading...
      </div>
    );
  }
  
  **/}

  return (
    <div className="page-body-background in-center relative">
      <div className="absolute inset-0 z-0 w-full h-[30vh]">
        <BannerImage bannerImage={profile?.userBanner || "B2"} />
        <div className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-t to-transparent from-skin-start opacity-35 z-10" />
      </div>
      <div
        className="absolute opacity-15 inset-0 min-h-screem w-full
         bg-gradient-to-r to-white from-transparent z-10"
      ></div>

      <div className="page-body-section in-center z-20">
        <div className="flex flex-col relative in-center w-full h-[20vh] bg-opacity-40">
          <div className="absolute flex-row left-2 md:left-4 -bottom-1/2 h-[150px] w-[150px] rounded-full overflow-hidden">
            <ProfileImage profileImage={profile?.userAvatar} />
          </div>
        </div>
        <div
          className="flex flex-row relative -z-10 items-center justify-center
            w-full h-[12vh] bg-skin-primary text-skin-color1"
        >
          <div className="flex flex-col  w-1/5 h-full" />
          <div className="flex w-4/5 flex-col h-full items-end px-2 justify-center text-stylep3">
            <span>{profile?.username || "Guest"}</span>
            <span className="text-stylep4 opacity-80">
              {profile?.email || "gmail@gmail.com"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 w-full pb-2 lg:pb-4 gap-4 px-2 py-1  bg-skin-primary">
          {[
            { key: "profile", label: "Profile", icon: <FaUser size={14}/> },
            { key: "store", label: "Store", icon: <FaStore size={14}/> },
            { key: "cart", label: "Cart", icon: <FaShoppingCart size={14}/> },
            { key: "orders", label: "Orders", icon: <FaBoxArchive size={14}/> },
            
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`grid grid-cols-[1fr_2.5fr] items-center justify-center bg-skin-buttonColor-1
                 bg-opacity-15 space-y-1 md:space-x-3 px-3 py-2 text-stylep4 md:text-stylep3
                transition-colors
              ${
                activeSection === item.key
                  ? "bg-skin-fill-4 text-skin-colorHigh text-skin-accent"
                  : "text-skin-color1 hover:text-skin-color2"
              }
            `}
                  >
                    <span>{item.icon}</span><span>{item.label}</span> 
                  </button>
                ))}
        </div>

        <div className="flex w-full min-h-[60vh] bg-skin-color-back p-2">
            {activeSection === "profile" && (
                <UserHomePageSectionComponent profile={profile} />
              )}
            
            {activeSection === "store" && (
                <StoreHomepageSectionComponent profile={profile} storeNotif={sellerNotif} />
              )}
            
            {activeSection === "cart" && (
                <CartHomePageSectionComponent profile={profile} />
              )}
        </div>



        <div className="">header</div>
        <div>dynamically change display depending on the header clicked</div>

        <div className="text-div overflow-hidden relative z-20">
          <div className="grid grid-cols-2 md:grid-cols-3 mt-10">
            <div className="flex flex-col w-full items-center space-y-3 p-2">
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
                <p className="text-skin-color1 mb-1">
                  You don’t own a store yet.
                </p>
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
                “Turn creativity into commerce — your store, your story.” -
                Ekommerce
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
    </div>
  );
};

export default HomePage;
