import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, profile } = useSelector(state => state.auth);
  
  const {isAdmin} = profile?.isAdmin;
  
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      if (adminOnly && !isAdmin ) {
        navigate("/unauthorize");
        return;
      }
    };

    verifyToken();
  }, [token, isAdmin, navigate, dispatch]);

  if(!token) return null;

  return children;
}

export default ProtectedRoute