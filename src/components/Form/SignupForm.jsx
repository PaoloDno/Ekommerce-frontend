import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signUpAction } from "../../store/actions/AuthThunks";
import { FaCircleArrowLeft } from "react-icons/fa6";

const SignInFormComponent = () => {
  const { isPending } = useSelector((state) => state.auth);
  const { username } = useAppContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sanitizeInput = (input) => input.trim().replace(/[\/<>#]/g, "");

  const [userData, setUserData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    middlename: "",
    email: "",
    password: "",
    address: {
      street: "",
      city: "",
      country: "",
      postalCode: "",
    },
  });

  const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
  const CLEAN_TEXT_REGEX = /^[^&<>"'/]*$/;

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "username":
        return USER_REGEX.test(value) ? "" : "Invalid username.";
      case "email":
        return EMAIL_REGEX.test(value) ? "" : "Invalid email.";
      case "password":
        return PWD_REGEX.test(value) ? "" : "Invalid password.";
      default:
        return CLEAN_TEXT_REGEX.test(value) ? "" : "Invalid characters.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validate top-level fields
    Object.keys(userData).forEach((key) => {
      if (typeof userData[key] !== "object") {
        const error = validateField(key, userData[key]);
        if (error) newErrors[key] = error;
      }
    });

    // Validate address fields
    Object.keys(userData.address).forEach((addrKey) => {
      const error = validateField(addrKey, userData.address[addrKey]);
      if (error) newErrors[addrKey] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSuccess(true);

    const sanitizedData = {
      ...userData,
      username: sanitizeInput(userData.username),
      firstname: sanitizeInput(userData.firstname),
      lastname: sanitizeInput(userData.lastname),
      middlename: sanitizeInput(userData.middlename),
      email: sanitizeInput(userData.email),
      password: sanitizeInput(userData.password),
      address: {
        street: sanitizeInput(userData.address.street),
        city: sanitizeInput(userData.address.city),
        country: sanitizeInput(userData.address.country),
        postalCode: sanitizeInput(userData.address.postalCode),
      },
    };

    const resultAction = await dispatch(signUpAction(sanitizedData));

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

  const tailwindPeerLabel =
    "auth-label peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-translate-y-4  peer-[&:not(:placeholder-shown)]:scale-90 peer-[&:not(:placeholder-shown)]:text-xs";

  const inputClasses = (field) =>
    `block w-full p-2 mb-2 border rounded auth-inputs peer
    ${
      errors[field]
        ? "border-red-500"
        : success
        ? "border-green-500"
        : "border-gray-300"
    }`;

  return (
    <div className="auth-form">
      {username ? (
        <div className="flex w-full h-full flex-col items-start">
          <p className="text-stylep1">Welcome! You are logged in!</p>
          <Link
            to="/"
            className="flex flex-row items-center text-stylep1 w-fit py-1"
          >
            <FaCircleArrowLeft className="text-styleh4 mr-2" /> Go to Homepage!
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 bg-gray-200 rounded-md">
          <h2 className="text-xl font-bold mb-4">Sign In</h2>

          {/* Username */}
          <div className="auth-field">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={userData.username}
              onChange={handleChange}
              className={inputClasses("username")}
            />
            <label className={tailwindPeerLabel}>Username</label>
            {errors.username && (
              <p className="text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div className="auth-field">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={handleChange}
              className={inputClasses("email")}
            />
            <label className={tailwindPeerLabel}>Email</label>
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="auth-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
              className={inputClasses("password")}
            />
            <label className={tailwindPeerLabel}>Password</label>
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>

          <h3 className="text-lg font-semibold mt-4 mb-2">Address</h3>

          {/* Street */}
          <div className="auth-field">
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={userData.address.street}
              onChange={handleChangeAddress}
              className={inputClasses("street")}
            />
            <label className={tailwindPeerLabel}>Street</label>
            {errors.street && <p className="text-red-500">{errors.street}</p>}
          </div>

          {/* City */}
          <div className="auth-field">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={userData.address.city}
              onChange={handleChangeAddress}
              className={inputClasses("city")}
            />
            <label className={tailwindPeerLabel}>City</label>
            {errors.city && <p className="text-red-500">{errors.city}</p>}
          </div>

          {/* Country */}
          <div className="auth-field">
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={userData.address.country}
              onChange={handleChangeAddress}
              className={inputClasses("country")}
            />
            <label className={tailwindPeerLabel}>Country</label>
            {errors.country && <p className="text-red-500">{errors.country}</p>}
          </div>

          {/* Postal Code */}
          <div className="auth-field">
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={userData.address.postalCode}
              onChange={handleChangeAddress}
              className={inputClasses("postalCode")}
            />
            <label className={tailwindPeerLabel}>Postal Code</label>
            {errors.postalCode && (
              <p className="text-red-500">{errors.postalCode}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="auth-button flex items-center justify-center mt-4"
            disabled={isPending}
          >
            {isPending ? (
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : (
              "Sign In!"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default SignInFormComponent;
