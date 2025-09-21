import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "../../../store/actions/AuthThunks";
import { useNavigate } from "react-router-dom";
import { FaCircleArrowRight } from "react-icons/fa6";
import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import AuthImg from "../images/authImg.jpg";

const SignUpFormComponent = () => {
  const { isPending, error } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    middlename: "",
    street: "",
    city: "",
    country: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.username) errs.username = "Username required";
    if (!form.email) errs.email = "Email required";
    if (!form.password) errs.password = "Password required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const result = await dispatch(signUpAction(form));
    if (signUpAction.fulfilled.match(result)) navigate("/");
  };

  return (
    <AuthLayout
      imageSide={
        <div className="auth-container-right">
          <img src={AuthImg} className="w-full h-full object-cover" />
        </div>
      }
      redirect={{
        to: "/login",
        text: "LOGIN!",
        icon: <FaCircleArrowRight className="auth-redirection-icon" />,
      }}
    >
      <div className="auth-title">Sign Up</div>
      <AuthInput label="Username" name="username" value={form.username} onChange={handleChange} error={errors.username} />
      <AuthInput label="Email" type="email" name="email" value={form.email} onChange={handleChange} error={errors.email} />
      <AuthInput label="Password" type="password" name="password" value={form.password} onChange={handleChange} error={errors.password} />
      {/* More fields: firstname, lastname, address... */}
      {error && <p className="error-p">{error}</p>}
      <button type="submit" onClick={handleSubmit} disabled={isPending} className="auth-button">
        {isPending ? <div className="loader" /> : "Sign Up"}
      </button>
    </AuthLayout>
  );
};

export default SignUpFormComponent;
