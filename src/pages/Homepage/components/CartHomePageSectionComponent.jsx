import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartHomePageSectionComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/cart-user", { replace: true });
  }, [navigate]);

  return null; // nothing to render since we redirect
};

export default CartHomePageSectionComponent;