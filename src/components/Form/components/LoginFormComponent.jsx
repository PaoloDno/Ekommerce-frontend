import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../store/actions/AuthThunks";
import { useNavigate, Link } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";
import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import AuthVideo from "../videos/Rainy.mp4";

const LoginFormComponent = () => {
  const { token, isPending, error } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userCreds, setUserCreds] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const CLEAN_TEXT_REGEX = /^[^&<>"'/]*$/;
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,24}$/;

  const sanitizeInput = (input) => {
    return input.trim().replace(/[\/<>#]/g,"");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCreds((p) => ({ ...p, [name]: value }));
  };

  const validateField = (name, value) => {
    if (!value || value.trim() === "") {
      return "This field is required.";
    }

    switch(name) {
      case "username":
        return USER_REGEX.test(value) ? "" : "Invalid username.";
      case "password":
        return PWD_REGEX.test(value) ? "" : "Invalid password.";
      default:
        return CLEAN_TEXT_REGEX.test(value) ? "" : "Invalid characters.";
    }
  }

  const validateFields = () => {
    let newErrors = {};

    Object.keys(userCreds).forEach((key) => {
      const error = validateField(key, userCreds[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    if(validateFields()) {
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

  if(token) {
    return (
      <div className="flex w-full h-full min-h-screen">
        <span>It seems ur already </span>
      </div>
    );
  }


  return (
    <AuthLayout
      imageSide={
        <>
          <video
            src={AuthVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="authbgblur"></div>
          <div
            className="absolute inset-0 w-full h-full bg-gradient-to-t 
            to-green-400 from-transparent opacity-30 z-10"
          ></div>
          <div
            className="absolute inset-0 bg-gradient-to-t to-skin-end 
          from-transparent opacity-30"
          ></div>
          <div
            className="absolute flex flex-col w-full
              top-1/4 right-0 gap-2 pt-2 text-stylep2
              p-5 font-Oswald bg-skin-colorContent bg-opacity-70 
              hover:bg-skin-primary hover:text-skin-color1 transition-colors
              duration-1000 ease-in-out"
          >
            <div
              className="absolute inset-0 w-full h-full bg-skin-colorContent blur-sm opacity-20 z-10"
            ></div>
            <span className="z-20 text-stylep3 md:text-stylep2">You dont have an account?</span>
            <span className="z-20 text-stylep3 md:text-stylep2 mb-2">Sign up instead..</span>
            <Link
              to="/signup"
              className="flex w-full md:w-2/3 mx-auto justify-center items-center
                p-2 px-3 bg-skin-primary
                text-skin-color1 font-bold font-Oswald text-stylep2 md:text-stylep1
                rounded-lg
                shadow-xl z-20 opacity-100"
            >
              SIGN UP
            </Link>
          </div>
        </>
      }
      redirect={{
        to: "/",
        text: "go back to landing page",
        icon: <FaCircleArrowLeft />,
      }}
    >
      <div className="auth-title">Welcome! We Miss You</div>
      <AuthInput
        label="Username"
        name="username"
        value={userCreds.username}
        onChange={handleChange}
        error={errors.username}
        helper="3-18 char,"
      />
      <AuthInput
        label="Password"
        type="password"
        name="password"
        value={userCreds.password}
        onChange={handleChange}
        error={errors.password}
      />
      {error && <p className="error-p">{error}</p>}
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isPending}
        className="auth-button"
      >
        {isPending ? <div className="loader" /> : "Login"}
      </button>
    </AuthLayout>
  );
};

export default LoginFormComponent;
