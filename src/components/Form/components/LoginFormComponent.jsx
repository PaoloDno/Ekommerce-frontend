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
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,24}$/;

  const sanitizeInput = (input) => {
    return input.trim().replace(/[\/<>#]/g, "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCreds((p) => ({ ...p, [name]: value }));
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
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

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

  if (token) {
    return (
      <div className="flex w-full h-full min-h-screen in-center bg-skin-primary text-skin-color1">
        <span>It seems ur already logged in</span>
      </div>
    );
  }

  return (
    <AuthLayout
      imageSide={
        <video
          src={AuthVideo}
          autoPlay
          loop
          muted
          playsInline
          className="flex relative inset-0 w-full h-full object-cover"
        />
      }
      redirect={{
        to: "/",
        text: "go back to landing page",
        icon: <FaCircleArrowLeft />,
      }}
    >
      <div
        className="relative w-4/5 max-w-md mx-auto mt-16 p-6 rounded-2xl
          bg-skin-colorContent/60 backdrop-blur-xl
          border border-white/20 shadow-2xl
          text-skin-colorContent flex flex-col space-y-4"
      >
        <div className="absolute inset-0 rounded-2xl bg-white/5 blur-xl -z-10" />
        <div className="flex flex-row space-x-2 items-center">
          <h2 className="text-styleh2 font-display text-center">LOGIN</h2>
          <span className="text-styleh2">{"/"}</span>
          <h3
            onClick={() => navigate("/signup")}
            className="text-stylep2 font-display text-center 
          bg-skin-fill-3 text-skin-color3 px-2 py-1 rounded-lg"
          >
            SIGN-UP
          </h3>
        </div>
        <AuthInput
          label="Username"
          name="username"
          value={userCreds.username}
          onChange={handleChange}
          error={errors.username}
          helper="4–24 chars, starts with a letter, letters/numbers/_/- only"
        />

        <AuthInput
          label="Password"
          type="password"
          name="password"
          value={userCreds.password}
          onChange={handleChange}
          error={errors.password}
          helper="8–24 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol (!@#$%)"
        />

        {error && <p className="error-p text-center">{error}</p>}

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={isPending}
          className="mt-4 w-full py-2 rounded-lg
            bg-skin-green/90 hover:bg-skin-green
            text-skin-color1 text-styleh4
            flex justify-center items-center
            backdrop-blur-md transition-all"
        >
          {isPending ? <div className="loader" /> : "Login"}
        </button>
      </div>
    </AuthLayout>
  );
};

export default LoginFormComponent;
