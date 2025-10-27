import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../store/actions/AuthThunks";

const TokenErrorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLogOut = async () => {
      await dispatch(logoutAction);
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 2000);
    };

    handleLogOut();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      { loading ? (
        <>
          <h1>Token Expired</h1>
          <p>Redirecting to landing page ...</p>
        </>
      ) : (
        <>
          <p>Redirecting ... </p>
        </>
      )}
    </div>
  )
};

export default TokenErrorPage;