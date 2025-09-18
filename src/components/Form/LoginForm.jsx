import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../store/actions/AuthThunks";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { FaCircleArrowLeft } from "react-icons/fa6";

import AuthImg from "./images/authImg.jpg";

const LoginFormComponent = () => {
  const { isPending, isRejected, isSuccess, error } = useSelector(
    (state) => state.auth
  );
  const { username } = useAppContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const CLEAN_TEXT_REGEX = /^[^&<>"'/]*$/;
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,24}$/;

  const sanitizeInput = (input) => {
    return input.trim().replace(/[\/<>#]/g, "");
  };

  const [userCreds, setUserCreds] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCreds((prev) => ({ ...prev, [name]: value }));
  };

  const validateField = (name, value) => {
    if (!value || value.trim() === "") {
      return "This field is required.";
    }

    switch (name) {
      case "username":
        return USER_REGEX.test(value) ? "" : "Invalid username.";
      case "password":
        return PWD_REGEX.test(value) ? "" : "Invalid password.";
      default:
        return CLEAN_TEXT_REGEX.test(value) ? "" : "Invalid characters.";
    }
  };

  const validateFields = () => {
    let newErrors = {};

    Object.keys(userCreds).forEach((key) => {
      const error = validateField(key, userCreds[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // reset to empty object

    if (validateFields()) {
      const sanitizedCreds = {
        username: sanitizeInput(userCreds.username),
        password: sanitizeInput(userCreds.password),
      };

      try {
        const resultAction = await dispatch(loginAction(sanitizedCreds));

        if (loginAction.fulfilled.match(resultAction)) {
          console.log("Login successful");
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        } else {
          console.log("Login failed");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const tailwindPeerLabel =
    "auth-label peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-translate-y-4 peer-[&:not(:placeholder-shown)]:scale-90 peer-[&:not(:placeholder-shown)]:text-xs";

  const tailwindHelper =
    "form-helper hidden opacity-0 peer-focus:block peer-focus:opacity-80 transition-opacity duration-200";

  const inputClasses = "rounded auth-inputs peer border border-gray-300";

  return (
    <div className="auth-form">
      {username ? (
        <div className="flex w-full h-full bg-skin-primary text-skin-color1">
          <p className="text-stylep1">Welcome! u r logged in!</p>
          <Link
            to="/signup"
            className="flex flex-row items-center text-stylep1 w-fit py-1"
          >
            <FaCircleArrowLeft className="text-styleh4 mr-2" /> Go to Homepage!
          </Link>
        </div>
      ) : (
        <div className="flex w-full h-full flex-row bg-red-400 z-0 rounded-l-2xl">
          <div className="flex h-full min-w-[200px] overflow-hidden relative">
            <img src={AuthImg} className="w-full h-full bg-contain" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-skin-end z-20 bg-opacity-90"></div>
            <div className="absolute top-0 left-0 flex-col text-start justify-start w-5/6 p-4 md:p-5 z-30 text-styleh">
              <p className="text-styleh4 text-skin-colorContent font-Montserrat mb-2
              flex flex-col
              ">
                <span className="text-styleh3 font-bold">Welcome!</span> <span>No account?</span></p>
              <Link
                to="/signup"
                className="flex flex-row items-center text-stylep3 py-1
                border-skin-colorBorder2 border-2 rounded-lg px-3 w-full
                "
              >
                <FaCircleArrowLeft className="text-styleh4 mr-2 h-[2rem] w-[2.25rem] box-border p-1" /> SignUp instead!
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="auth-form-content">
            <div className="auth-title">Login</div>

            <div className="auth-field">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={userCreds.username}
                onChange={handleChange}
                className={inputClasses}
              />
              <label className={tailwindPeerLabel}>Username</label>
              <div className={tailwindHelper}>
                <span>Must start with a letter A to Z, a to z</span>
                <span>
                  Can include letters, numbers, underscores, or hyphens
                </span>
                <span>Length: 4 to 24 characters</span>
              </div>
              {errors.username && <p className="error-p">{errors.username}</p>}
            </div>

            <div className="auth-field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={userCreds.password}
                onChange={handleChange}
                className={inputClasses}
              />
              <label className={tailwindPeerLabel}>Password</label>
              <div className={tailwindHelper}>
                <span>At least 1 lowercase, 1 uppercase, 1 number</span>
                <span>At least 1 special: ! @ # $ %</span>
                <span>8 to 24 characters</span>
              </div>
              {errors.password && <p className="error-p">{errors.password}</p>}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="auth-button flex items-center justify-center"
              disabled={isPending || isSuccess}
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
