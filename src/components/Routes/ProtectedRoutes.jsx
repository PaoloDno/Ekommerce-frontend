import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false, toAdmin = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, profile } = useSelector((state) => state.auth);

  // it fo admin redirect to /admin

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      if (!profile) return;

      if (adminOnly && !profile.isAdmin) {
        navigate("/unauthorize", { replace: true });
        return;
      }
      if (toAdmin && profile.isAdmin) {
        navigate("/admin", { replace: true });
        return;
      }
    };

    verifyToken();
  }, [token, navigate, dispatch]);

  if (!token || !profile) return null; // prevent rerednders

  return children;
};

export default ProtectedRoute;
