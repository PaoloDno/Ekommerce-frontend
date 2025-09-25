import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "../../../store/actions/AuthThunks";
import { useNavigate } from "react-router-dom";
import { FaCircleArrowRight } from "react-icons/fa6";
import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import AuthVideo from "../videos/Rainy.mp4";

const SignUpFormComponent = () => {
  const { token, isPending, error } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
  const CLEAN_TEXT_REGEX = /^[^&<>"'/]*$/;

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    user: {
      username: "",
      email: "",
      password: "",
    },
    profile: {
      userAvatar: "",
      firstname: "",
      lastname: "",
      middlename: "",
    },
    address: {
      street: "",
      city: "",
      country: "",
      postalCode: "",
    },
  });
  const [errors, setErrors] = useState({
    user: {},
    profile: {},
    address: {},
  });

  const handleChange = (e) => {
    const { section, name, value } = e.target;
    setFormData((p) => ({
      ...p,
      [section]: {
        ...p[section],
        [name]: value,
      },
    }));

    setErrors((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: "",
      },
    }));
  };

  const validateField = (section, field, value) => {
    switch (field) {
      case "username":
        return USER_REGEX.test(value)
          ? ""
          : "Username must be 3-23 characters, alphanumeric.";
      case "email":
        return EMAIL_REGEX.test(value) ? "" : "Invalid email format.";
      case "password":
        return PWD_REGEX.test(value)
          ? ""
          : "Password must be 8-24 characters, include uppercase, lowercase, number, and symbol.";
      case "confirmPassword":
        return value === formData.user.password
          ? ""
          : "Passwords do not match.";
      default:
        return CLEAN_TEXT_REGEX.test(value) && value
          ? ""
          : "No special characters allowed.";
    }
  };

  const validateStep = () => {
    const { user, profile, address } = formData;

    let stepErrors = {};
    const fields =
      step === 1 ? user : step === 2 ? profile : step === 3 ? address : {};

    for (const field in fields) {
      const error = validateField(
        step === 1 ? "user" : step === 2 ? "profile" : "address",
        field,
        fields[field]
      );
      if (error) {
        stepErrors[field] = error;
      }
    }

    if (Object.keys(stepErrors).length) {
      setErrors((prev) => ({ ...prev, 
        [step === 1 ? "user" : step === 2 ? "profile" : "address"]: stepErrors, 
    }));
      return false
    }
    return true;
  };

  const handleNext = () => {
    setIsLoading(true);
    if(validateStep()) {
      setStep((prev) => prev + 1);
    }
  }

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      const { user, profile, address } = formData;
      const resultAction = await dispatch(registerAction({ user, profile, address }));
      console.log(resultAction);

      if (registerAction.fulfilled.match(resultAction)) {
        console.log('Registration successful!');
        const timeoutId = setTimeout(() => {
          navigate('/home');
        }, 1000);
        return () => clearTimeout(timeoutId);
      } else {
        console.log('Login failed. Please check your username and password.');
      }
    }
  };

  return (
    <AuthLayout
      imageSide={
        <div className="auth-container-right">
          <img
            src={AuthImg}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      }
      redirect={{
        to: "/login",
        text: "LOGIN!",
        icon: <FaCircleArrowRight className="auth-redirection-icon" />,
      }}
    >
      <div className="auth-title">Sign Up</div>
      <AuthInput
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
        error={errors.username}
      />
      <AuthInput
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
      />
      <AuthInput
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
      />
      {/* More fields: firstname, lastname, address... */}
      {error && <p className="error-p">{error}</p>}
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isPending}
        className="auth-button"
      >
        {isPending ? <div className="loader" /> : "Sign Up"}
      </button>
    </AuthLayout>
  );
};

export default SignUpFormComponent;
