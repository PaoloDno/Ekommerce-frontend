import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "../../../store/actions/AuthThunks";
import { Link, useNavigate } from "react-router-dom";
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
    user: { username: "", email: "", password: "", confirmPassword: "" },
    profile: { userAvatar: "A1", firstname: "", lastname: "", middlename: "" },
    address: { street: "", city: "", country: "", postalCode: "" },
  });

  const [errors, setErrors] = useState({
    user: {},
    profile: {},
    address: {},
  });

  const handleChange = (section, e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
    setErrors((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: "",
      },
    }));
  };

  const validateField = (section, field, value) => {
    switch (field) {
      case "username":
        return USER_REGEX.test(value) ? "" : "Username must be 3-23 characters, alphanumeric.";
      case "email":
        return EMAIL_REGEX.test(value) ? "" : "Invalid email format.";
      case "password":
        return PWD_REGEX.test(value)
          ? ""
          : "Password must be 8-24 characters, include uppercase, lowercase, number, and symbol.";
      case "confirmPassword":
        return value === formData.user.password ? "" : "Passwords do not match.";
      default:
        return CLEAN_TEXT_REGEX.test(value) && value ? "" : "No special characters allowed.";
    }
  };

  const validateStep = () => {
    const section = step === 1 ? "user" : step === 2 ? "profile" : "address";
    const fields = formData[section];
    let stepErrors = {};
    for (const field in fields) {
      const error = validateField(section, field, fields[field]);
      if (error) stepErrors[field] = error;
    }
    if (Object.keys(stepErrors).length) {
      setErrors((prev) => ({ ...prev, [section]: stepErrors }));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setIsLoading(true);
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      const { user, profile, address } = formData;
      const resultAction = await dispatch(signUpAction({ ...user, ...profile, address: {...address} }));
      if (signUpAction.fulfilled.match(resultAction)) {
        const timeoutId = setTimeout(() => {
          navigate("/home");
        }, 1000);
        return () => clearTimeout(timeoutId);
      }
    }
  };

  const renderStep = () => (
    <div>
      {step === 1 && (
        <div className="flex flex-col w-full h-full min-h-[520px] justify-between">
            <div className="flex flex-col w-full">
          
          <div className="auth-title">Sign Up</div>
          <AuthInput
            label="Username"
            name="username"
            value={formData.user.username}
            onChange={(e) => handleChange("user", e)}
            error={errors.user.username}
          />
          <AuthInput
            type="email"
            label="Email"
            name="email"
            value={formData.user.email}
            onChange={(e) => handleChange("user", e)}
            error={errors.user.email}
          />
          <AuthInput
            type="password"
            label="Password"
            name="password"
            value={formData.user.password}
            onChange={(e) => handleChange("user", e)}
            error={errors.user.password}
          />
          <AuthInput
            type="password"
            label="Repeat Password"
            name="confirmPassword"
            value={formData.user.confirmPassword}
            onChange={(e) => handleChange("user", e)}
            error={errors.user.confirmPassword}
          />
          </div>
          <span className="flex flex-row justify-between">
            <button className="auth-button" 
            type="button" onClick={handleNext}>Next</button>
          </span>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col w-full h-full min-h-[520px] justify-between">
            <div className="flex flex-col w-full">
            <div className="auth-title">Profile Info</div>
            <AuthInput
              label="Firstname"
              name="firstname"
              value={formData.profile.firstname}
              onChange={(e) => handleChange("profile", e)}
              error={errors.profile.firstname}
            />
            <AuthInput
              label="Lastname"
              name="lastname"
              value={formData.profile.lastname}
              onChange={(e) => handleChange("profile", e)}
              error={errors.profile.lastname}
            />
            <AuthInput
              label="Middlename"
              name="middlename"
              value={formData.profile.middlename}
              onChange={(e) => handleChange("profile", e)}
              error={errors.profile.middlename}
            />
          </div>
          <span className="flex flex-row justify-between">
            <button className="auth-button" 
            type="button" onClick={handleBack}>Prev</button>
            <button className="auth-button"
            type="button" onClick={handleNext}>Next</button>
          </span>
        </div>
      )}

      {step === 3 && (
       <div className="flex flex-col w-full h-full min-h-[520px] justify-between">
            <div className="flex flex-col w-full">
          <div className="auth-title">Address</div>
          <AuthInput
            label="Street"
            name="street"
            value={formData.address.street}
            onChange={(e) => handleChange("address", e)}
            error={errors.address.street}
          />
          <AuthInput
            label="City"
            name="city"
            value={formData.address.city}
            onChange={(e) => handleChange("address", e)}
            error={errors.address.city}
          />
          <AuthInput
            label="Country"
            name="country"
            value={formData.address.country}
            onChange={(e) => handleChange("address", e)}
            error={errors.address.country}
          />
          <AuthInput
            label="Postal Code"
            name="postalCode"
            value={formData.address.postalCode}
            onChange={(e) => handleChange("address", e)}
            error={errors.address.postalCode}
          />
          </div>
          <span className="flex flex-row justify-between">
            <button className="auth-button"
            type="button" onClick={handleBack}>Prev</button>
            <button type="submit" 
              onClick={handleSubmit}
              disabled={isPending} className="auth-button">
              {isPending ? <div>loading . . .</div> : "Sign Up"}
            </button>
          </span>
        </div>
      )}
    </div>
  );

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
          <div className="absolute inset-0 w-full h-full bg-gradient-to-t to-green-400 from-transparent opacity-30 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t to-skin-end from-transparent opacity-30"></div>
          <div className="absolute flex flex-col w-full top-1/4 right-0 gap-2 pt-2 text-stylep2 p-5 font-Oswald bg-skin-colorContent bg-opacity-70 hover:bg-skin-primary hover:text-skin-color1 transition-colors duration-1000 ease-in-out">
            <div className="absolute inset-0 w-full h-full bg-skin-colorContent blur-sm opacity-20 z-10"></div>
            <span className="z-20 text-stylep3 md:text-stylep2">Already registered?</span>
            <span className="z-20 text-stylep3 md:text-stylep2 mb-2">Go to Login instead..</span>
            <Link
              to="/login"
              className="flex w-full md:w-2/3 mx-auto justify-center items-center p-2 px-3 bg-skin-primary 
              hover:bg-green-800 hover:text-green-100 text-skin-color1 font-bold md:font-Oswald text-stylep2 
              md:text-stylep1 rounded-lg shadow-xl z-20 opacity-100 "
            >
              LOGIN
            </Link>
          </div>
        </>
      }
      redirect={{
        to: "/login",
        text: "LOGIN!",
        icon: <FaCircleArrowRight className="auth-redirection-icon" />,
      }}
    >
      {renderStep()}
      {error && <p className="error-p">{error}</p>}
    </AuthLayout>
  );
};

export default SignUpFormComponent;
