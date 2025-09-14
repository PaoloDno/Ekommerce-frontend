import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import { useAppContext } from "../../context/AppContext";

const HomePage = () => {
  const {token } = useSelector((state) => state.auth);
  const { username,totalItems } = useAppContext();
  useEffect(() => {
    console.log(token);
    console.log(totalItems);
  }, [])
  return (
    <div className="page-section">
      <div className="page-body">
        {/* homepage */}
        <div className="flex flex-col">
          {token}
          <span>{totalItems || "jesus"}
          </span>
          <span>{username || "christ"}</span>
          <span>Username</span>
          <span>fullname</span>
          <span>address</span>
        </div>
        <div>Store</div>
        <div>
          <span>Carts</span>
        </div>
        <div>Reviews</div>
        <div>Order History</div>

      </div>
      <div className="page-background"></div>
    </div>
  )
};

export default HomePage;
