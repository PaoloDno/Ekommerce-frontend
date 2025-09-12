import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../store/actions/AuthThunks";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { FaCircleArrowLeft } from "react-icons/fa6";

const LoginFormComponent = () => {
  const { isPending, isRejected, isSuccess } = useSelector(
    (state) => state.auth
  );
  const { username } = useAppContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sanitizeInput = (input) => {
    return input.trim().replace(/[\/<>#]/g, "");
  };

  const [userCreds, setUserCreds] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCreds((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const sanitizedCreds = {
      username: sanitizeInput(userCreds.username),
      password: sanitizeInput(userCreds.password),
    };

    const resultAction = await dispatch(loginAction(sanitizedCreds));

    if (loginAction.fulfilled.match(resultAction)) {
      console.log("Login successful");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      console.log("Login failed");
      setError("Invalid username or password");
    }
  };

  const getInputClasses = () => {
    if (isPending) return "border-blue-500";
    if (isSuccess) return "border-green-500";
    if (isRejected) return "border-red-500";
    return "border-gray-300";
  };

  return (
    <div className="auth-form">
      {username ? (
        <div className="flex w-full h-full">
          <p className="text-stylep1">Welcome! u r logged in!</p>
            <Link
              to="/signup"
              className="flex flex-row items-center text-stylep1 w-fit py-1"
            >
              <FaCircleArrowLeft className="text-styleh4 mr-2" /> Go to Homepage!
            </Link>
          </div>
      ) : (
        <div>
          <div className="flex flex-col text-start justify-start w-5/6 p-4 md:p-5 z-10 text-stylep1">
            <p className="text-stylep1">Welcome! No account?</p>
            <Link
              to="/signup"
              className="flex flex-row items-center text-stylep1 w-fit py-1"
            >
              <FaCircleArrowLeft className="text-styleh4 mr-2" /> Sign Up!
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="auth-form-content">
            <div className="auth-field">
              <input
                type="text"
                name="username"
                placeholder=" "
                value={userCreds.username}
                onChange={handleChange}
                className={`auth-inputs peer ${getInputClasses()}`}
              />
              <label
                className="auth-label
              peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
              peer-placeholder-shown:text-sm
              peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-xs
              peer-[&:not(:placeholder-shown)]:-translate-y-4 
              peer-[&:not(:placeholder-shown)]:scale-90 
              peer-[&:not(:placeholder-shown)]:text-xs
              "
              >
                Username
              </label>
            </div>

            <div className="auth-field">
              <input
                type="password"
                name="password"
                placeholder=" "
                value={userCreds.password}
                onChange={handleChange}
                className={`auth-inputs peer ${getInputClasses()}`}
              />
              <label
                className="auth-label
              peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
              peer-placeholder-shown:text-sm
              peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-xs
              peer-[&:not(:placeholder-shown)]:-translate-y-4 
              peer-[&:not(:placeholder-shown)]:scale-90 
              peer-[&:not(:placeholder-shown)]:text-xs
          "
              >
                Password
              </label>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="auth-button flex items-center justify-center"
              disabled={isPending}
            >
              {isPending ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginFormComponent;
