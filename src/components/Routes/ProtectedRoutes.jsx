import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, profile } = useSelector(state => state.auth);
  
  
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      if(profile) {
      if (adminOnly && !profile?.isAdmin ) {
        navigate("/unauthorize");
        return;
      }
    }
    };

    verifyToken();
  }, [token, navigate, dispatch]);

  if(!token) return null;

  return children;
}

export default ProtectedRoute