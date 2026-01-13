import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "../../../store/actions/AuthThunks";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleArrowRight } from "react-icons/fa6";
import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import AuthVideo from "../videos/Rainy.mp4";
import BannerImage from "../../ImagesComponent/components/BannerImageComponent";
import ProfileImage from "../../ImagesComponent/components/ProfileImageComponent";

const SignUpFormComponent = () => {
  const { token, isPending, error } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
  const CLEAN_TEXT_REGEX = /^[^&<>"'/]*$/;

  const helpers = {
    username: "4–24 chars, starts with a letter, letters/numbers/_/- only",
    password:
      "8–24 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol (!@#$%)",
    email: "Valid email format (example@domain.com)",
  };

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    user: { username: "", email: "", password: "", confirmPassword: "" },
    profile: {
      userAvatar: "A1",
      userBanner: "B1",
      firstname: "",
      lastname: "",
      middlename: "",
    },
    address: { street: "", city: "", country: "", postalCode: "", phoneNumber: "" },
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
      [section]: { ...prev[section], [name]: value },
    }));
    setErrors((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: "" },
    }));
  };

  const validateField = (field, value, compareValue = null) => {
    if (!value || value.trim() === "") return "This field is required.";
    switch (field) {
      case "username":
        return USER_REGEX.test(value) ? "" : helpers.username;
      case "email":
        return EMAIL_REGEX.test(value) ? "" : helpers.email;
      case "password":
        return PWD_REGEX.test(value) ? "" : helpers.password;
      case "confirmPassword":
        return value === compareValue ? "" : "Passwords do not match.";
      default:
        return CLEAN_TEXT_REGEX.test(value) ? "" : "Invalid characters.";
    }
  };

  const validateStep = () => {
    const section = step === 1 ? "user" : step === 2 ? "profile" : "address";
    const data = formData[section];
    let stepErrors = {};
    Object.keys(data).forEach((field) => {
      const error = validateField(
        field,
        data[field],
        field === "confirmPassword" ? formData.user.password : null
      );
      if (error) stepErrors[field] = error;
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      const { user, profile, address } = formData;
      const resultAction = await dispatch(
        signUpAction({ ...user, ...profile, address })
      );
      if (signUpAction.fulfilled.match(resultAction)) {
        setTimeout(() => navigate("/home"), 1000);
      }
    }
  };

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const renderStep = () => (
    <>
      {step === 1 && (
        <div className="grid grid-cols-2 w-full">
          <AuthInput
            label="Username"
            name="username"
            value={formData.user.username}
            onChange={(e) => handleChange("user", e)}
            error={errors.user.username}
            helper={helpers.username}
          />
          <AuthInput
            type="email"
            label="Email"
            name="email"
            value={formData.user.email}
            onChange={(e) => handleChange("user", e)}
            error={errors.user.email}
            helper={helpers.email}
          />
          <AuthInput
            type="password"
            label="Password"
            name="password"
            value={formData.user.password}
            onChange={(e) => handleChange("user", e)}
            error={errors.user.password}
            helper={helpers.password}
          />
          <AuthInput
            type="password"
            label="Repeat Password"
            name="confirmPassword"
            value={formData.user.confirmPassword}
            onChange={(e) => handleChange("user", e)}
            error={errors.user.confirmPassword}
            helper="Repeat the password"
          />
        </div>
      )}

      {step === 2 && (
        <div className="">
          <div className="flex flex-col md:grid md:grid-cols-[1fr_1.5fr] gap-2 items-center py-2 lg:pb-4 text-stylep3">
            <div className="relative w-full h-[100px] lg:h-[120px] rounded-lg bg-gray-500 overflow-hidden">
              <BannerImage bannerImage={formData.profile.userBanner} />
              <div className="absolute bottom-0 left-2 w-[60px] h-[60px] lg:w-[100px] lg:h-[100px] rounded-full overflow-hidden">
                <ProfileImage input={formData.profile.userAvatar} />
              </div>
            </div>
            <div className="grid grid-cols-2 items-start justify-start space-y-2 w-full">
              <label className="text-gray-600 text-stylep2">
                Select Avatar
              </label>
              <select
                className="w-full border border-white/20 rounded-lg px-2 py-1 bg-skin-colorContent text-skin-colorContent"
                name="userAvatar"
                value={formData.profile.userAvatar}
                onChange={(e) => handleChange("profile", e)}
              >
                <option value="A1">Avatar A1</option>
                <option value="A2">Avatar A2</option>
                <option value="A3">Avatar A3</option>
              </select>

              <label className="text-gray-600 text-stylep2 mt-2">
                Select Banner
              </label>
              <select
                className="w-full border border-white/20 rounded-lg px-2 py-1 bg-skin-colorContent text-skin-colorContent"
                name="userBanner"
                value={formData.profile.userBanner}
                onChange={(e) => handleChange("profile", e)}
              >
                <option value="B1">Banner B1</option>
                <option value="B2">Banner B2</option>
                <option value="B3">Banner B3</option>
              </select>
            </div>
          </div>

          <AuthInput
            label="Firstname"
            name="firstname"
            value={formData.profile.firstname}
            onChange={(e) => handleChange("profile", e)}
            error={errors.profile.firstname}
            helper="Required"
          />
          <AuthInput
            label="Lastname"
            name="lastname"
            value={formData.profile.lastname}
            onChange={(e) => handleChange("profile", e)}
            error={errors.profile.lastname}
            helper="Required"
          />
          <AuthInput
            label="Middlename"
            name="middlename"
            value={formData.profile.middlename}
            onChange={(e) => handleChange("profile", e)}
            error={errors.profile.middlename}
            helper="Required"
          />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-2">
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
          
          <AuthInput
            label="Phone No#"
            name="phoneNumber"
            value={formData.address.phoneNumber}
            onChange={(e) => handleChange("address", e)}
            error={errors.address.phoneNumber}
          />
        </div>
      )}

      <div className="flex justify-between mt-4">
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="w-1/2 py-2 rounded-lg bg-skin-primary/70 hover:bg-skin-primary text-white transition"
          >
            Prev
          </button>
        )}
        {(step == 2 || step == 1) && (
          <button
            type="button"
            onClick={handleNext}
            className="w-1/2 py-2 rounded-lg bg-skin-green/80 hover:bg-skin-green text-white transition ml-2"
          >
            Next
          </button>
        )}

        {step === 3 && (
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isPending}
            className="w-1/2 py-2 rounded-lg bg-skin-green/90 hover:bg-skin-green text-white transition ml-2"
          >
            {isPending ? "Pending" : "Sign Up"}
          </button>
        )}
      </div>
    </>
  );

  if (token)
    return (
      <div className="flex w-full h-full min-h-screen in-center bg-skin-primary text-skin-color1">
        <span>You are already logged in</span>
      </div>
    );

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
      mode={"signup"}
      redirect={{
        to: "/",
        text: "go back to landing page",
        icon: <FaCircleArrowRight />,
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}

      <div
        className="relative w-full max-w-md mx-auto mt-16 p-6 rounded-2xl
        bg-skin-colorContent/60 backdrop-blur-xl border border-white/20 shadow-2xl
        text-skin-colorContent flex flex-col space-y-4"
      >
        <div className="absolute inset-0 rounded-2xl bg-white/5 blur-xl -z-10" />
        <div className="flex flex-row space-x-2 items-center">
          <h2 className="text-styleh2 font-display text-center">SIGN-UP</h2>
          <span className="text-styleh2">{"/"}</span>
          <h3
            onClick={() => navigate("/login")}
            className="text-stylep2 font-display text-center 
          bg-skin-fill-3 text-skin-color3 px-2 py-1 rounded-lg"
          >
            {" "}
            LOGIN
          </h3>
        </div>
        {error && <p className="min-h-[1rem] text-stylep4 text-red-600 text-center mt-2">{error}</p>}
        {renderStep()}
      </div>
    </AuthLayout>
  );
};

export default SignUpFormComponent;
