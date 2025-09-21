
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../store/actions/AuthThunks";
import { useNavigate } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";
import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import AuthImg from "../images/authImg.jpg";

const LoginFormComponent = () => {
  const { token, isPending, error } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userCreds, setUserCreds] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCreds((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!userCreds.username) errs.username = "Username required";
    if (!userCreds.password) errs.password = "Password required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await dispatch(loginAction(userCreds));
    if (loginAction.fulfilled.match(result)) navigate("/home");
  };

  return (
    <AuthLayout
      imageSide={
        <div className="auth-container-left">
          <img src={AuthImg} className="w-full h-full object-cover" />
        </div>
      }
      redirect={{
        to: "/signup",
        text: "SIGN UP!",
        icon: <FaCircleArrowLeft className="auth-redirection-icon" />,
      }}
    >
      <div className="auth-title">Login</div>
      <AuthInput
        label="Username"
        name="username"
        value={userCreds.username}
        onChange={handleChange}
        error={errors.username}
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
      <button type="submit" onClick={handleSubmit} disabled={isPending} className="auth-button">
        {isPending ? <div className="loader" /> : "Login"}
      </button>
    </AuthLayout>
  );
};

export default LoginFormComponent;
