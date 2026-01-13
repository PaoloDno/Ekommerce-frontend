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
import OrderHomePageSectionComponent from "./components/OrderHomePageSectionComponent";

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
      
      <div
        className="absolute opacity-15 inset-0 min-h-screem w-full
         bg-gradient-to-r to-white from-transparent z-10"
      ></div>

      <div className="page-body-section in-center z-20">
        <div className="absolute inset-0 -z-10 w-full h-[30vh]">
        <BannerImage bannerImage={profile?.userBanner || "B2"} />
        <div className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-t to-transparent from-skin-start opacity-35 z-10" />
      </div>
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

        <div className="grid grid-cols-4 w-full pb-2 lg:pb-4 gap-4 px-3 py-1 text-skin-color1  bg-skin-primary">
          {[
            { key: "profile", count: 0, label: "Profile", icon: <FaUser size={14}/> },
            { key: "store", count: sellerNotif.length, label: "Store", icon: <FaStore size={14}/> },
            { key: "cart", count: items.length , label: "Cart", icon: <FaShoppingCart size={14}/> },
            { key: "orders", count: orders.length , label: "Orders", icon: <FaBoxArchive size={14}/> },
            
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`grid grid-cols-[1fr_2.5fr] sm:flex sm:flex-col items-center justify-center bg-skin-buttonColor-1
                 bg-opacity-75 space-y-1 space-x-1 px-3 py-2 text-stylep4 md:text-stylep3
                transition-colors relative border-2 border-skin-colorBorder1 border-opacity-15 shadow-md
              ${
                activeSection === item.key
                  ? "bg-skin-fill-1 text-skin-colorHigh text-skin-accent"
                  : "text-skin-color1 hover:text-skin-color2"
              }
            `}
                  >
                    <span>{item.icon}</span><span>{item.label}</span>
                    { item.count > 0 &&
                    <span className="absolute -top-2 md:-top-3 -right-2 md:right-0 bg-skin-red font-bold
                    w-[22px] h-[22px] rounded-full items-center justify-center text-stylep4"
                    >{item.count}</span>
                    } 
                  </button>
                ))}
        </div>

        <div className="flex w-full min-h-[60vh] bg-skin-primary p-2 lg:px-3">
            {activeSection === "profile" && (
                <UserHomePageSectionComponent profile={profile} />
              )}
            
            {activeSection === "store" && (
                <StoreHomepageSectionComponent profile={profile} storeNotif={sellerNotif} />
              )}
            
            {activeSection === "cart" && (
                <CartHomePageSectionComponent profile={profile} />
              )}

             {activeSection === "orders" && (
                <OrderHomePageSectionComponent orders={orders} />
              )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
